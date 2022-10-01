import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import AdminPage from '../components/pages/AdminPage'

const Admin = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)

  return <>{persistLogin(<AdminPage />)}</>
}

Admin.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Admin
