const asyncHandler = require("express-async-handler")

const User = require("../models/UserModel")
const Note = require("../models/NoteModel")
const Ticket = require("../models/TicketModel")

// @desc Get notes for ticket
// @route /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.json(notes)
})

// @desc Create a new ticket note
// @route /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  })

  res.json(note)
})

module.exports = {
  getNotes,
  addNote,
}
