const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

/**
 * @desc Get notes for a ticket
 * @route GET /api/tickets/:ticketId/notes
 * @access private
 */
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

/**
 * @desc Create ticket note
 * @route POST /api/tickets/:ticketId/notes
 * @access private
 */
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  const noteData = {
    user: req.user.id,
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
  }

  const note = await Note.create(noteData)

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
