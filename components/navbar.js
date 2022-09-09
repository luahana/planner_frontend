import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSendLogoutMutation } from '../api/authApiSlice'

const navbar = () => {
  const router = useRouter()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess])

  const onLogoutClicked = () => sendLogout()

  return (
    <nav className='nav'>
      {isLoading && <p>Logging Out...</p>}
      {isError && <p>Error: {error.message}</p>}
      <Link href='/'>
        <a>logo</a>
      </Link>
      <ul className='nav-menu'>
        <li>home</li>
        <li>about</li>
      </ul>
      <Link href='/login'>
        <a>log in</a>
      </Link>
      <button onClick={onLogoutClicked}>log out</button>
    </nav>
  )
}

export default navbar
