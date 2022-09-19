import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MonthlyPage from '../../../components/pages/MonthlyPage'
import { useRouter } from 'next/router'

const monthly = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const { mid } = router.query

  return <>{persistLogin(<MonthlyPage mid={mid} />)}</>
}

monthly.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default monthly
