import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSendLogoutMutation } from '../redux/slice/api/authApiSlice'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const router = useRouter()
  const { email, isAdmin } = useAuth()
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
        <li>
          <Link href='/dash'>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href='/notes'>
            <a>Notes</a>
          </Link>
        </li>
      </ul>
      {email && <p>{email}</p>}
      <Link href='/login'>
        <a>log in</a>
      </Link>
      <button onClick={onLogoutClicked}>log out</button>
    </nav>
  )
}

export default Navbar
