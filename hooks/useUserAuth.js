import { useRouter } from 'next/router'
import React from 'react'
import useAuth from './useAuth'

const useUserAuth = () => {
  const router = useRouter()
  const { user_id } = useAuth()
  if (!user_id) {
    router.push('/')
    return
  }
  return user_id
}

export default useUserAuth
