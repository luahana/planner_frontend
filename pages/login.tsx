import LoginPage from '../components/pages/LoginPage'
import usePersist from '../hooks/usePersist'
import { useEffect } from 'react'

type Props = {
  googleClientId: string
}

const Login = ({ googleClientId }: Props) => {
  const [persist, setPersist] = usePersist(true)
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
