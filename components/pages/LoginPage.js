import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../../redux/slice/authSlice'
import { didFromDateStr } from '../../lib/date'
import { useGoogleLoginMutation } from '../../redux/slice/api/authApiSlice'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30%;
  width: 50%;
  gap: 3rem;
  overflow: hidden;
`

const LoginPage = ({ googleClientId }) => {
  const dispatch = useDispatch()
  const curToken = useSelector(selectCurrentToken)
  const router = useRouter()
  const dt = new Date()
  const [
    googleLogin,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useGoogleLoginMutation()

  const handleCallbackResponse = async (response) => {
    const res = await googleLogin({
      googleToken: response.credential,
    })

    dispatch(setCredentials({ accessToken: res.data.accessToken }))

    router.push(`/daily/${didFromDateStr(dt.toDateString())}`)
  }

  useEffect(() => {
    if (curToken) {
      router.push(`/daily/${didFromDateStr(dt.toDateString())}`)
    }
    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById('my-signin2'), {
      scope: 'profile email',
      width: '100%',
      // height: 5000,
      longtitle: true,
      theme: 'dark',
      // onsuccess: onSuccess,
      // onfailure: onFailure,
    })
  }, [])

  return (
    <Wrapper>
      <LoginWrapper>
        <h1>Sign in with Google</h1>
        <div id='my-signin2' />
      </LoginWrapper>
    </Wrapper>
  )
}

export default LoginPage
