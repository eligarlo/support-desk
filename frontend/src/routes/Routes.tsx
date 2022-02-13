import { useRoutes } from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NewTicket from 'pages/NewTicket'
import PrivateRoute from 'components/PrivateRoute'

const Routes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/new-ticket',
      element: <PrivateRoute />,
      children: [
        {
          path: '/new-ticket',
          element: <NewTicket />,
        },
      ],
    },
  ])
  return routes
}

export default Routes
