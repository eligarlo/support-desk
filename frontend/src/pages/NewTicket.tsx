import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'app/hooks'
import { createTicket, reset } from 'features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from 'components/Spinner'
import BackButton from 'components/BackButton'

const NewTicket: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useAppSelector(state => state.tickets)

  const name = user?.name
  const email = user?.email
  const [product, setProduct] = useState<string>('iPhone')
  const [description, setDescription] = useState<string>('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
      toast.success('Ticket created successfully')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  const onChangeProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value)
  }

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select name='product' id='product' value={product} onChange={onChangeProduct}>
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              value={description}
              id='description'
              className='form-control'
              placeholder='Description'
              onChange={onChangeDescription}
            ></textarea>
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
