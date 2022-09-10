import React, { useEffect } from 'react'
import { store } from '../redux/store'
import {
  usersApiSlice,
  useGetUsersQuery,
} from '../redux/slice/api/usersApiSlice'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrrArgChange: true,
  })
  useEffect(() => {
    console.log('subscribing users')
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing users')
      users.unsubscribe()
    }
  }, [])

  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p className=''>{error?.data?.message}</p>}
      {isSuccess &&
        users &&
        users.ids.map((id) => <p key={id}>{users.entities[id].email}</p>)}
    </>
  )
}

export default UsersList
