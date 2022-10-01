import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import UnassignedPage from '../components/pages/UnassignedPage'

const Unassigned = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)

  return <>{persistLogin(<UnassignedPage />)}</>
}

Unassigned.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Unassigned
