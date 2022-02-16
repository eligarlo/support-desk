import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import ticketReducer from 'features/tickets/ticketSlice'
import noteReducer from 'features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
