import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  console.log('token')
  console.log(token)
  if (token) {
    const decoded = jwtDecode(token)
    const { _id, email, name, isAdmin } = decoded

    return { user_id: _id, email, name, isAdmin }
  }

  return {}
}
export default useAuth
