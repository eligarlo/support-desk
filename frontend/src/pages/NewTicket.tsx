import { useAppSelector } from 'app/hooks'
import { useState } from 'react'

const NewTicket: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const name = user?.name
  const email = user?.email
  const [product, setProduct] = useState<string>('iPhone')
  const [description, setDescription] = useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const onChangeProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value)
  }

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <>
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
