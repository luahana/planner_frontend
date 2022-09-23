import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSendLogoutMutation } from '../redux/slice/api/authApiSlice'
import useAuth from '../hooks/useAuth'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import currentWeekNumber from 'current-week-number'

const Navbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user_id, isAdmin } = useAuth()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  const d = new Date()

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
              <Link
                href={`/weekly/${new Date().getFullYear()}${currentWeekNumber()}`}
              >
                <li className={styles.pointer} onClick={close}>
                  <a>Weekly</a>
                </li>
              </Link>
              <Link
                href={`/monthly/${new Date().getFullYear()}${d.getMonth() + 1}`}
              >
                <li className={styles.pointer} onClick={close}>
                  <a>Monthly</a>
                </li>
              </Link>
              <Link href='/unassigned'>
                <li className={styles.pointer} onClick={close}>
                  <a>Unassigned</a>
                </li>
              </Link>
            </>
          )}
          {isAdmin && (
            <li className={styles.pointer} onClick={close}>
              <Link href='/admin'>
                <a>Admin</a>
              </Link>
            </li>
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
                  <Link
                    href={`/weekly/${new Date().getFullYear()}${currentWeekNumber()}`}
                  >
                    <a>Weekly</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/monthly/${new Date().getFullYear()}${
                      d.getMonth() + 1
                    }`}
                  >
                    <a>Monthly</a>
                  </Link>
                </li>
                <li>
                  <Link href='/unassigned'>
                    <a>Unassigned</a>
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link href='/admin'>
                      <a>Admin</a>
                    </Link>
                  </li>
                )}
                <li>
                  <div className={styles.pointer} onClick={onLogoutClicked}>
                    log out
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        {!user_id && (
          <Link href='/login'>
            <div className={styles.pointer} onClick={close}>
              <a>log in</a>
            </div>
          </Link>
        )}
      </nav>
    </>
  )
}

export default Navbar
