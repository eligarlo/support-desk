import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface ITicket {
  product: string
  description: string
}

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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {},
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
