import { useEffect } from 'react'
import { useAppSelector } from 'app/hooks'
import { useDispatch } from 'react-redux'
import { getTickets, reset } from 'features/tickets/ticketSlice'
import Spinner from 'components/Spinner'
import BackButton from 'components/BackButton'
import TicketItem from 'components/TicketItem'

const Tickets: React.FC = () => {
  const { tickets, isLoading, isSuccess } = useAppSelector(state => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>My Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
