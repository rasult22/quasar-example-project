const express = require('express')
const router = express.Router()
const { createUser, updateUser, deleteUser, getUsers, getUserById } = require('../../../controllers/user')


// Fetch all the users
router.get('/', getUsers)

// Get single user by ID
router.get('/:id', getUserById)

// Post single user
router.post('/create', createUser)

// Patch request example 
router.patch('/:id', updateUser)

// DELETE request example
router.delete('/:id', deleteUser)

module.exports = router