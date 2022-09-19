import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import AdminPage from '../components/pages/AdminPage'

const admin = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)

  return <>{persistLogin(<AdminPage />)}</>
}

admin.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default admin
