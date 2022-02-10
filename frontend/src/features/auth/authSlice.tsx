import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit'

interface IAuthState {
  user: null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: IAuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

interface IRegisterUser {
  name: string
  email: string
  password: string
}

interface ILoginUser {
  email: string
  password: string
}

// Register new user
export const register = createAsyncThunk('auth/register', async (user: IRegisterUser, thunkAPI) => {
  console.log(user)
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: ILoginUser, thunkAPI) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {},
})

export default authSlice.reducer
