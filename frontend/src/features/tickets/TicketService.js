import axios from "axios"

const API_URL = "/api/tickets/"

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// Fetch user tickets
const getTickets = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Fetch single ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(API_URL + ticketId)

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(API_URL + ticketId)

  const response = await axios.put(API_URL + ticketId, { status: "Closed" }, config)

  return response.data
}

const TicketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
}

export default TicketService
