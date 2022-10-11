import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MemoizedDailyPage from '../../../components/pages/daily/DailyPage'
import { useRouter } from 'next/router'

type Props = {
  initialPersistValue: boolean
}

const Daily = ({ initialPersistValue }: Props) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const did = router.query.did as string

  return <>{persistLogin(<MemoizedDailyPage did={did} />)}</>
}

Daily.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Daily
