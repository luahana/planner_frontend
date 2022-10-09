import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSendLogoutMutation } from '../redux/slice/api/authApiSlice'
import useAuth from '../hooks/useAuth'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { calcWeekId } from '../lib/calendar'
import { didFromDate, midFromDate, ymdFromDate } from '../lib/date'
import { addZero } from '../lib/date'

const Navbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user_id, isAdmin } = useAuth()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess])

  const open = () => {
    setIsOpen(!isOpen)
  }

  const close = () => {
    setIsOpen(false)
  }
  const onLogoutClicked = () => {
    sendLogout()
    close()
  }
  addZero
  const dt = new Date()
  const mid = midFromDate(dt)
  const wid = calcWeekId(ymdFromDate(dt))
  const did = didFromDate(dt)

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
              <Link href={`/daily/${did}`}>
                <li className={styles.pointer} onClick={close}>
                  <a>Today</a>
                </li>
              </Link>
              <Link href={`/weekly/${wid}`}>
                <li className={styles.pointer} onClick={close}>
                  <a>Weekly</a>
                </li>
              </Link>
              <Link href={`/monthly/${mid}`}>
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
        <Link href='/'>
          <div className={styles.pointer}>
            <a>SimpleToDo</a>
          </div>
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
                  <Link href={`/daily/${did}`}>
                    <a>Today</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/weekly/${wid}`}>
                    <a>Weekly</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/monthly/${mid}`}>
                    <a>Monthly</a>
                  </Link>
                </li>
                <li>
                  <Link href='/unassigned'>
                    <a>Unassigned</a>
                  </Link>
                </li>
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
              <a>Sign in</a>
            </div>
          </Link>
        )}
      </nav>
    </>
  )
}

export default Navbar
