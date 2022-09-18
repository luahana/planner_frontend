import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetNotesQuery } from '../../redux/slice/api/notesApiSlice'
import Modal from '../Modal'
import Note from '../Note'
import useUserAuth from '../../hooks/useUserAuth'
import Time from '../Time'
import { device } from '../../config/deviceBreakpoint'

const Wrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const Header = styled.div`
  padding: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
  }
`

const NewNoteBtnDiv = styled.div``

const Main = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const NotesPage = () => {
  const user_id = useUserAuth()
  const [openModal, setOpenModal] = useState(false)

  const {
    data: notes,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error {error?.data?.message}</p>
  if (!isLoading && isSuccess) {
    const { ids, entities } = notes
    const filteredIds = [...ids].filter(
      (id) => entities[id].user._id === user_id
    )
    content = filteredIds
      .sort((a, b) => {
        return entities[a].completed === entities[b].completed
          ? 0
          : entities[a].completed
          ? 1
          : -1
      })
      .map((id) => {
        return (
          <Note
            key={id}
            noteId={id}
            userId={user_id}
            noteTitle={entities[id].title}
            noteContent={entities[id].content}
            noteCompleted={entities[id].completed}
            isFetching={isFetching}
          />
        )
      })
  }

  return (
    <>
      <Modal
        user_id={user_id}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Wrapper>
        <Header>
          <Time />
          <NewNoteBtnDiv>
            <button onClick={() => setOpenModal(true)}>New Note</button>
          </NewNoteBtnDiv>
        </Header>
        <Main>{content}</Main>
      </Wrapper>
    </>
  )
}

export default NotesPage
