import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MemoizedWeeklyPage from '../../../components/pages/weekly/WeeklyPage'
import { useRouter } from 'next/router'

const Weekly = ({ initialPersistValue }) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const { wid } = router.query

  return <>{persistLogin(<MemoizedWeeklyPage wid={wid} />)}</>
}

Weekly.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Weekly
