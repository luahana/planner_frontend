import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'
import LoginPage from '../components/pages/LoginPage'
import { useRouter } from 'next/router'
import usePersist from '../hooks/usePersist'
import { useEffect } from 'react'

const Login = ({ initialPersistValue, googleClientId }) => {
  const persistLogin = usePersistLogin(initialPersistValue)
  const [persist, setPersist] = usePersist(initialPersistValue)
  const router = useRouter()
  const { wid } = router.query
  useEffect(() => {
    setPersist(true)
  }, [])
  console.log('googleClientId')
  console.log(googleClientId)
  return <>{persistLogin(<LoginPage wid={wid} />)}</>
}

Login.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export async function getStaticProps(context) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  return {
    props: { googleClientId },
  }
}

export default Login
