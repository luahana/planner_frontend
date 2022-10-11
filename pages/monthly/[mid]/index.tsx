import { parseCookies } from '../../../lib/parseCookies'
import usePersistLogin from '../../../hooks/usePersistLogin'
import MonthlyPage from '../../../components/pages/monthly/MonthlyPage'
import { useRouter } from 'next/router'

type Props = {
  initialPersistValue: boolean
}

const Monthly = ({ initialPersistValue }: Props) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const router = useRouter()
  const mid = router.query.mid as string

  return <>{persistLogin(<MonthlyPage mid={mid} />)}</>
}

Monthly.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Monthly
