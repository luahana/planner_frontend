import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'
import { Auth, defaultAuth } from '../lib/auth'

type jwtAuth = {
  _id: string
  email: string
  name: string
  isAdmin: boolean
}

const useAuth = (): Auth => {
  const token = useSelector(selectCurrentToken)
  if (token) {
    const decoded = jwtDecode<jwtAuth>(token)
    const { _id, email, name, isAdmin } = decoded

    return { user_id: _id, email, name, isAdmin }
  }

  return { ...defaultAuth }
}
export default useAuth
