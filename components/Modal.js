import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { device } from '../config/deviceBreakpoint'
import { useAddNewNoteMutation } from '../redux/slice/api/notesApiSlice'

const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  top: 0;
  height: 100%;
  @media ${device.tablet} {
  }
`

const ModalContainer = styled.div`
  max-width: 600px;
  width: 100%;
  width: 400px;
  height: 400px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  @media ${device.tablet} {
  }
`

const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  position: relative;
  @media ${device.tablet} {
  }
`

const ButtonClose = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding-right: 0.5rem;
  @media ${device.tablet} {
  }
`

const TitleDiv = styled.div`
  margin-bottom: 1em;
  min-width: 100%;
  @media ${device.tablet} {
  }
`
const ContentDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  min-width: 100%;
  @media ${device.tablet} {
  }
`

const SaveDiv = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: flex-end;
  @media ${device.tablet} {
  }
`

const TitleInput = styled.input`
  width: 100%;
  @media ${device.tablet} {
  }
`

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 250px;
  @media ${device.tablet} {
  }
`

const Modal = ({ user_id, open, onClose }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [assignedDate, setAssignedDate] = useState(new Date())
  // const [userId, setUserId] = useState(user_id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setContent('')
    }
  }, [isSuccess])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSaveClicked = async (e) => {
    e.preventDefault()

    if (!title && !content) {
      onClose()
      return
    }
    await addNewNote({
      user: user_id,
      title,
      content,
      completed: false,
      assignedDate,
    })
    onClose()
  }

  if (!open) return null
  return (
    <Overlay onClick={onSaveClicked}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Wrapper>
          <ButtonClose>
            <p className='closeBtn' onClick={onClose}>
              X
            </p>
          </ButtonClose>
          <TitleDiv>
            <TitleInput
              type='text'
              value={title}
              placeholder='title'
              onChange={onTitleChanged}
            />
          </TitleDiv>
          <ContentDiv>
            <ContentTextarea
              type='textarea'
              value={content}
              placeholder='content'
              onChange={onContentChanged}
            />
          </ContentDiv>
          <SaveDiv>
            <button onClick={onSaveClicked}>Save</button>
          </SaveDiv>
        </Wrapper>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal
