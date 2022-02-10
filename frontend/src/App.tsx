import { BrowserRouter as Router } from 'react-router-dom'
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
    </>
  )
}

export default App
