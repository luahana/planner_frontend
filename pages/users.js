import { useEffect, useRef, useState } from 'react'
import UsersList from '../components/UsersList'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../api/authSlice'
import { useRefreshMutation } from '../api/authApiSlice'
import usePersist from '../hooks/usePersist'
import Cookie from 'js-cookie'
import { parseCookies } from '../lib/parseCookies'

const users = ({ initialPersistValue }) => {
  const [persist, setPersist] = useState(() => JSON.parse(initialPersistValue))
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  console.log('VALUE: persist')
  console.log(JSON.parse(persist))

  useEffect(() => {
    Cookie.set('persist', persist)
  }, [persist])

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          //const response =
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
  }, [])

  let content
  if (!persist) {
    // persist: no
    console.log('no persist')
    content = <UsersList />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log('loading')
    // content = <PulseLoader color={"#FFF"} />
  } else if (isError) {
    //persist: yes, token: no
    console.log('error')
    // content = (
    //     <p className='errmsg'>
    //         {`${error?.data?.message} - `}
    //         <Link to="/login">Please login again</Link>.
    //     </p>
    // )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = <UsersList />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <UsersList />
  }

  return content
}

users.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default users
