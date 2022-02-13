import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import ticketReducer from 'features/tickets/ticketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
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
