import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MemoizedDailyPage from '../../../components/pages/daily/DailyPage'
import { useRouter } from 'next/router'

const Daily = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const { did } = router.query

  return <>{persistLogin(<MemoizedDailyPage did={did} />)}</>
}

Daily.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Daily
