const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error
  })
}
const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to client
  if(error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })

    // Programming or other unknown error: don't leak error details 
  } else {
    // 1. Log error
    console.error('ERROR', error)

    // 2. Send generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    })
  }
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error'
 
  if(process.env.NODE_ENV !== 'production') {
    sendErrorDev(error, res)
  } else {
    sendErrorProd(error, res)
  }
 
}