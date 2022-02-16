import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'app/hooks'
import { useDispatch } from 'react-redux'
import { getTicket, closeTicket } from 'features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from 'features/notes/noteSlice'
import { toast } from 'react-toastify'
import NoteItem from 'components/NoteItem'
import Spinner from 'components/Spinner'
import BackButton from 'components/BackButton'

const Ticket: React.FC = () => {
  const { savedTicket, isLoading, isError, message } = useAppSelector(state => state.tickets)

  const { notes, isLoading: notesIsLoading } = useAppSelector(state => state.notes)

  const navigate = useNavigate()
  const params = useParams()
  const { ticketId } = params
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    ticketId && dispatch(getTicket(ticketId))
    ticketId && dispatch(getNotes(ticketId))
  }, [isError, message, ticketId, dispatch])

  const onTicketClose = () => {
    ticketId && dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {savedTicket._id}
          <span className={`status status-${savedTicket.status}`}>{savedTicket.status}</span>
        </h2>
        <h3>Date Submitted {new Date(savedTicket.createdAt).toLocaleString('es-ES')}</h3>
        <h3>Product: {savedTicket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{savedTicket.description}</p>
        </div>
        {notes.length > 0 && <h2>Notes</h2>}
      </header>

      {notes.map(note => (
        <NoteItem key={note._id} note={note} />
      ))}

      {savedTicket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
