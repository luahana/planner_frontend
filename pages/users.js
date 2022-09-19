import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import UsersPage from '../components/pages/UsersPage'

const users = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)

  return <>{persistLogin(<UsersPage />)}</>
}

users.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default users
