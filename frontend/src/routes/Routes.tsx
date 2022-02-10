import { useRoutes } from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'

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
  ])
  return routes
}

export default Routes
