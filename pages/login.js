import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/login.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../redux/slice/api/authApiSlice'
import { setCredentials } from '../redux/slice/authSlice'
import usePersist from '../hooks/usePersist'
import { parseCookies } from '../lib/parseCookies'
import { convertDateStrToDid } from '../lib/calendar'

const Login = ({ initialPersistValue }) => {
  const router = useRouter()
  const userRef = useRef()
  const errRef = useRef()
  const dispath = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist(initialPersistValue)
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev) => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      dispath(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      const dt = new Date()
      router.push(`/daily/${convertDateStrToDid(dt.toDateString())}`)
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      userRef.current.focus()
    }
  }

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type='text'
          value={email}
          ref={userRef}
          placeholder='email'
          onChange={handleEmailInput}
        />
        <input
          className={styles.input}
          type='password'
          value={password}
          placeholder='password'
          onChange={handlePwdInput}
        />

        <button className={styles.submit}>Log in</button>
        <label htmlFor='persist'>
          <input
            type='checkbox'
            id='persist'
            onChange={handleToggle}
            checked={JSON.parse(persist)}
          />
          Trust This Device
        </label>
      </form>
      <Link href='/signup'>
        <a>{`Don't have an accout? Sign up!`}</a>
      </Link>
    </div>
  )
}

Login.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default Login
