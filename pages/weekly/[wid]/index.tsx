import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MemoizedWeeklyPage from '../../../components/pages/weekly/WeeklyPage'
import { useRouter } from 'next/router'

type Props = {
  initialPersistValue: boolean
}

const Weekly = ({ initialPersistValue }: Props) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const wid = router.query.wid as string

  return <>{persistLogin(<MemoizedWeeklyPage wid={wid} />)}</>
}

Weekly.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Weekly
