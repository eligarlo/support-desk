import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ITicket } from 'features/tickets/ticketInterfaces'
import ticketService from 'features/tickets/ticketService'

interface ITicketState {
  tickets: ITicket[]
  ticket: ITicket
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: ITicketState = {
  tickets: [],
  ticket: {} as ITicket,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData: ITicket, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user tickets
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTickets(token)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const ticketSlice = createSlice({
  name: 'ticket',
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
        state.message = action.payload as string
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
        state.message = action.payload as string
      })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
