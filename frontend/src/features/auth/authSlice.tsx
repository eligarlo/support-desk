import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import authService from 'features/auth/authService'
import { IAuthUser, ILoginUser, IRegisterUser } from 'features/auth/authInterfaces'

interface IAuthState {
  user: IAuthUser | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

// Get user from localStorage
const user: IAuthUser = JSON.parse(localStorage.getItem('user') as string)

const initialState: IAuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register new user
export const register = createAsyncThunk('auth/register', async (user: IRegisterUser, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: ILoginUser, thunkAPI) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
