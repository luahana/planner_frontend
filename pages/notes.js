import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import NotesPage from '../components/pages/NotesPage'

const users = ({ initialPersistValue }) => {
  const persisLogin = usePersistLogin(initialPersistValue)

  return <>{persisLogin(<NotesPage />)}</>
}

users.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default users
