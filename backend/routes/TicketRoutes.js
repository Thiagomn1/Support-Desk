const express = require("express")
const router = express.Router()
const {
  createTicket,
  getTicket,
  getTickets,
  deleteTicket,
  updateTicket,
} = require("../controllers/TicketController")

const { protect } = require("../middleware/AuthMiddleware")
const NoteRouter = require("./NoteRoutes")
router.use("/:ticketId/notes", NoteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket)

router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router
