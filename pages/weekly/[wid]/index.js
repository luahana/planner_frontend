import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MemoizedWeeklyPage from '../../../components/pages/WeeklyPage'
import { useRouter } from 'next/router'

const weekly = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const { wid } = router.query

  return <>{persistLogin(<MemoizedWeeklyPage wid={wid} />)}</>
}

weekly.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default weekly
