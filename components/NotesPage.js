import React, { useState } from 'react'
import styled from 'styled-components'
import useAuth from '../hooks/useAuth'
import { useGetNotesQuery } from '../redux/slice/api/notesApiSlice'
import Modal from './Modal'
import Note from './Note'
import { useRouter } from 'next/router'

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
  margin: 2rem;
  padding: 1rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
`
const TitleDiv = styled.div``

const NewNoteBtnDiv = styled.div``

const NotesPage = () => {
  const { _id: user_id } = useAuth()
  const router = useRouter()
  if (!user_id) router.push('/')
  const [openModal, setOpenModal] = useState(false)

  const {
    data: notes,
    isLoading,
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
  if (isError) content = <p>Error {error}</p>
  if (!isLoading && isSuccess) {
    const { ids, entities } = notes
    console.log(entities)
    const filteredIds = [...ids].filter(
      (id) => entities[id].user._id === user_id
    )
    content = filteredIds.map((id) => <Note key={id} noteId={id} />)
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
            <TitleDiv> header</TitleDiv>
            <NewNoteBtnDiv>
              <button onClick={() => setOpenModal(true)}>New Note</button>
            </NewNoteBtnDiv>
          </Header>
          <div>{content}</div>
        </Wrapper>
      </ModalWrapper>
    </>
  )
}

export default NotesPage
