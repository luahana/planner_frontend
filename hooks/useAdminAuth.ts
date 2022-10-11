import { useRouter } from 'next/router'
import useAuth from './useAuth'

const useAdminAuth = (): string => {
  const router = useRouter()
  const { user_id, isAdmin } = useAuth()

  if (!isAdmin) {
    router.push('/')
    return
  }
  return user_id
}

export default useAdminAuth
