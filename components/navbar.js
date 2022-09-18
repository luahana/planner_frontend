import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSendLogoutMutation } from '../redux/slice/api/authApiSlice'
import useAuth from '../hooks/useAuth'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user_id, email, isAdmin } = useAuth()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess])

  const open = () => {
    // document.body.style.overflowY = 'hidden'
    setIsOpen(!isOpen)
  }

  const close = () => {
    // document.body.style.overflowY = 'auto'
    setIsOpen(false)
  }
  const onLogoutClicked = () => {
    sendLogout()
    close()
  }

  return (
    <>
      <div
        className={isOpen ? styles.overlayOpen : styles.overlayClose}
        onClick={close}
      />
      <div className={isOpen ? styles.menuOpen : styles.menuClose}>
        <ul className={styles.menuUl}>
          {user_id && (
            <>
              <Link href='/dash'>
                <li className={styles.pointer} onClick={close}>
                  <a>Dashboard</a>
                </li>
              </Link>
              <Link href='/notes'>
                <li className={styles.pointer} onClick={close}>
                  <a>Today</a>
                </li>
              </Link>
              <Link href='/notes'>
                <li className={styles.pointer} onClick={close}>
                  <a>Weekly</a>
                </li>
              </Link>
              <Link href='/notes'>
                <li className={styles.pointer} onClick={close}>
                  <a>Monthly</a>
                </li>
              </Link>
            </>
          )}
        </ul>
        {user_id && (
          <div
            className={`${styles.pointer} ${styles.logoutMenu}`}
            onClick={onLogoutClicked}
          >
            log out
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        {isLoading && <p>Logging Out...</p>}
        {isError && <p>Error: {error.message}</p>}
        <Link href='/'>
          <a>logo</a>
        </Link>
        {user_id && (
          <div className={styles.hamburger} onClick={open}>
            <FontAwesomeIcon icon={faBars} size='xl' />
          </div>
        )}
        {!user_id && (
          <Link href='/login'>
            <div className={styles.pointer} onClick={close}>
              <a>log in</a>
            </div>
          </Link>
        )}
        <div className={styles.navUlWrapper}>
          <ul>
            {user_id && (
              <>
                <li>
                  <Link href='/dash'>
                    <a>Dashboard</a>
                  </Link>
                </li>
                <li>
                  <Link href='/notes'>
                    <a>Today</a>
                  </Link>
                </li>
                <li>
                  <Link href='/notes'>
                    <a>Weekly</a>
                  </Link>
                </li>
                <li>
                  <Link href='/notes'>
                    <a>Monthly</a>
                  </Link>
                </li>
                <li>
                  <div className={styles.pointer} onClick={onLogoutClicked}>
                    log out
                  </div>
                </li>
              </>
            )}
            {!user_id && (
              <li>
                <Link href='/login'>
                  <a>log in</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
