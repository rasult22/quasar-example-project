const User = require('../models/userModel')

 
exports.createUser = async (req, res) => {

  try {
    const newUser = await User.create(req.body)
  
    res.status(201).json({
      status: 'success',
      data: { 
        user: newUser
      }
    })    
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    })
  }
}
exports.updateUser = (req, res) => {

}
exports.deleteUser = (req, res) => {

}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users}
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById()
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}