import { useState, useEffect } from 'react'
import { useAppSelector } from 'app/hooks'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setIsLoading(false)
  }, [user])

  return {
    loggedIn,
    isLoading,
  }
}
