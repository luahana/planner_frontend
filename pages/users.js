import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import UsersPage from '../components/pages/UsersPage'

const users = ({ initialPersistValue }) => {
  const persisLogin = usePersistLogin(initialPersistValue)

  return <>{persisLogin(<UsersPage />)}</>
}

users.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default users
