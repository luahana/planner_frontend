import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../../redux/slice/authSlice'
import { convertDateStrToDid } from '../../lib/calendar'
import { useGoogleLoginMutation } from '../../redux/slice/api/authApiSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const curToken = useSelector(selectCurrentToken)
  const router = useRouter()
  const dt = new Date()
  const [
    googleLogin,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useGoogleLoginMutation()

  const handleCallbackResponse = async (response) => {
    const { accessToken } = await googleLogin({
      googleToken: response.credential,
    })
    dispatch(setCredentials({ accessToken }))

    router.push(`/daily/${convertDateStrToDid(dt.toDateString())}`)
  }

  useEffect(() => {
    if (curToken) {
      router.push(`/daily/${convertDateStrToDid(dt.toDateString())}`)
    }
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    })
  }, [])

  return (
    <div>
      <div style={{ width: '100%' }} id='signInDiv' />
    </div>
  )
}

export default LoginPage
