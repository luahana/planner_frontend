import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false

  if (token) {
    const decoded = jwtDecode(token)
    const { email, isAdmin } = decoded

    return { email, isAdmin }
  }

  return { email: '', isAdmin }
}
export default useAuth
