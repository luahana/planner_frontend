import { useGetUsersQuery } from '../api/usersApiSlice'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery()
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
