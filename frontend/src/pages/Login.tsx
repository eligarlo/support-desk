import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'app/hooks'
import { login, reset } from 'features/auth/authSlice'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { ILoginUser } from 'features/auth/authInterfaces'
import Spinner from 'components/Spinner'

interface IFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset)
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userData: ILoginUser = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form' onSubmit={onSubmit}>
        <form>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
