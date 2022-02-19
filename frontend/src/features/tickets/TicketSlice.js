import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import TicketService from "./TicketService"

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Create a new ticket
export const createTicket = createAsyncThunk("tickets/create", async (ticketData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await TicketService.createTicket(ticketData, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Fetch user tickets
export const getTickets = createAsyncThunk("tickets/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await TicketService.getTickets(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Fetch single ticket
export const getTicket = createAsyncThunk("tickets/get", async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await TicketService.getTicket(ticketId, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Close ticket
export const closeTicket = createAsyncThunk("tickets/close", async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await TicketService.closeTicket(ticketId, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createTicket.pending, state => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, state => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTickets.pending, state => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTicket.pending, state => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.tickets.map(ticket => (ticket._id === action.payload._id ? (ticket.status = "Closed") : ticket))
      })
  },
})

export const { reset } = TicketSlice.actions
export default TicketSlice.reducer
