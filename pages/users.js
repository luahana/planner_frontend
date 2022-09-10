import { useEffect, useRef, useState } from 'react'
import UsersList from '../components/UsersList'
import { parseCookies } from '../lib/parseCookies'
import usePersistLogin from '../hooks/usePersistLogin'

const users = ({ initialPersistValue }) => {
  const persisLogin = usePersistLogin(initialPersistValue)

  return <>{persisLogin(<UsersList />)}</>
}

users.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req)
  return {
    initialPersistValue: cookies.persist,
  }
}

export default users
