import { useEffect } from 'react'
import { useAppSelector } from 'app/hooks'
import { useDispatch } from 'react-redux'
import { getTickets, reset } from 'features/tickets/ticketSlice'
import Spinner from 'components/Spinner'

interface ITicketsProps {}

const Tickets: React.FC<ITicketsProps> = ({}) => {
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

  return <div>Tickets</div>
}

export default Tickets
