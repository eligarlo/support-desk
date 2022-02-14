import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface IBackButtonProps {
  url: string
}

const BackButton: React.FC<IBackButtonProps> = ({ url }) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
      <FaArrowCircleLeft /> Back
    </Link>
  )
}

export default BackButton
