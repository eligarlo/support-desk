import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'app/hooks'
import { useDispatch } from 'react-redux'
import { getTicket, closeTicket } from 'features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset } from 'features/notes/noteSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import NoteItem from 'components/NoteItem'
import Spinner from 'components/Spinner'
import BackButton from 'components/BackButton'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Ticket: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [noteText, setNoteText] = useState<string>('')

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

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const onNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value)
  }

  const onNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    ticketId && dispatch(createNote({ noteText, ticketId }))
    closeModal()
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

      {savedTicket.status !== 'closed' && (
        <button className='btn' onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: '600px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'relative',
          },
        }}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={onNoteTextChange}
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

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
