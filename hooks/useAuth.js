import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false

  if (token) {
    const decoded = jwtDecode(token)
    console.log(decoded)
    const { _id, email, name, isAdmin } = decoded

    return { _id, email, name, isAdmin }
  }

  return { _id: '', email: '', name: '', isAdmin: false }
}
export default useAuth
