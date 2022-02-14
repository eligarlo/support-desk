import axios from 'axios'
import { ITicket } from 'features/tickets/ticketInterfaces'

const API_URL = '/api/tickets'

// Create new ticket
const createTicket = async (ticketData: ITicket, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// Get user tickets
const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
}

export default ticketService