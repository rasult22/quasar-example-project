// Operations List API
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')




router.get('/', (req, res) => {
  res.json({'msg': 'success'})
})

module.exports = router