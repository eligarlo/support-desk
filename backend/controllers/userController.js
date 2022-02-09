const asyncHandler = require('express-async-handler')

/**
 * @desc Register a new user
 * @route /api/users
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all the fields')
  }

  res.send('Register Route')
})

/**
 * @desc Login a new user
 * @route /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}
