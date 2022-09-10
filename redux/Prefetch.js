import { store } from './store'
import { usersApiSlice } from './slice/api/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.Prefetch('getUsers', 'usersList', { force: true })
    )
  }, [])

  return <Outlet />
}
export default Prefetch
