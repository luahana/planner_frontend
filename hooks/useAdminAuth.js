import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './useAuth'

const useAdminAuth = () => {
  const router = useRouter()
  const { user_id, isAdmin } = useAuth()

  if (!isAdmin) {
    router.push('/')
    return
  }
  return user_id
}

export default useAdminAuth
