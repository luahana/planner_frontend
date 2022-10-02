import LoginPage from '../components/pages/LoginPage'
import { useRouter } from 'next/router'
import usePersist from '../hooks/usePersist'
import { useEffect } from 'react'

const Login = ({ googleClientId }) => {
  const [persist, setPersist] = usePersist(true)
  const router = useRouter()
  const { wid } = router.query
  useEffect(() => {
    setPersist(true)
  }, [])
  return <>{<LoginPage googleClientId={googleClientId} />}</>
}

export async function getStaticProps() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  return {
    props: { googleClientId },
  }
}

export default Login
