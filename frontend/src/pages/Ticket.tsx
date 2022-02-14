import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'app/hooks'
import { useDispatch } from 'react-redux'
import { getTicket, reset } from 'features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from 'components/Spinner'
import BackButton from 'components/BackButton'

const Ticket: React.FC = () => {
  const { savedTicket, isLoading, isSuccess, isError, message } = useAppSelector(
    state => state.tickets
  )

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    params.ticketId && dispatch(getTicket(params.ticketId))
  }, [isError, message, params, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
      </header>
      <h2>
        Ticket ID: {savedTicket._id}
        <span className={`status status-${savedTicket.status}`}>{savedTicket.status}</span>
      </h2>
      <h3>Date Submitted {new Date(savedTicket.createdAt).toLocaleString('es-ES')}</h3>
      <hr />
      <div className='ticket-desc'>
        <h3>Description of Issue</h3>
        <p>{savedTicket.description}</p>
      </div>
    </div>
  )
}

export default Ticket
