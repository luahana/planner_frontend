import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetNotesQuery } from '../../redux/slice/api/notesApiSlice'
import Modal from '../Modal'
import Note from '../Note'
import useUserAuth from '../../hooks/useUserAuth'
import Time from '../Time'

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
`

const Header = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
`

const NewNoteBtnDiv = styled.div``

const Main = styled.div`
  padding: 1rem;
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
    content = filteredIds.map((id) => {
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
      <ModalWrapper>
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
      </ModalWrapper>
    </>
  )
}

export default NotesPage
