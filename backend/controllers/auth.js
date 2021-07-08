const User = require('../models/userModel')
const { promisify } = require('util')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt =  require('jsonwebtoken')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })
  const token = signToken(newUser._id)

  res.status(201).json({
    status:'success',
    token,
    data: { user: newUser }
  })
})  

exports.login = catchAsync(async (req, res, next) => {
  const {email, password } = req.body

  // 1) Check if email and password exist
  if(!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password')
 
  if(!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  // 3) If everyting ok, send toke to client
  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Getting token and check if it's therefore
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) {
    return next(new AppError('You aren\'t logged in. Please log in to get access', 401))
  }

  // 2) Verification token
  const decoded =  jwt.verify(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if(!currentUser) return next(new AppError('The user belonging to this token does no longer exist.', 401))
 
  // 4) Check if user changed password after the JWT was issued
  if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please log in again', 401))
  }

  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'premium']
    console.log(req.user.role)
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You don\'t have permission to perform this action', 403))
    }

    next()
  }
}

exports.forgotPassword = (req, res, next) => {}
exports.resetPassword = (req, res, next) => {}