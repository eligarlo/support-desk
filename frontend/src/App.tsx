import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Routes from 'routes/Routes'
import Header from 'components/Header'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
