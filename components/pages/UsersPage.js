import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetUsersQuery } from '../../redux/slice/api/usersApiSlice'
import Note from '../Note'
import useAdminAuth from '../../hooks/useAdminAuth'

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
`

const Header = styled.div`
  margin: 2rem;
  padding: 1rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
`
const TitleDiv = styled.div``

const UsersPage = () => {
  const user_id = useAdminAuth()

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error {error?.data?.message}</p>
  if (!isLoading && isSuccess) {
    const { ids, entities } = users

    content = ids.map((id) => <p key={id}>{entities[id].email}</p>)
  }

  return (
    <>
      <Wrapper>
        <Header>
          <TitleDiv> header</TitleDiv>
        </Header>
        <div>{content}</div>
      </Wrapper>
    </>
  )
}

export default UsersPage
