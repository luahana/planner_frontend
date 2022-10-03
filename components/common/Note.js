import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  useUpdateNoteMutation,
  useGetNoteByUserMonthQuery,
} from '../../redux/slice/api/notesApiSlice'
import Calendar from 'react-calendar'
import { device } from '../../config/deviceBreakpoint'
import EditView from './note/EditView'
import ShowView from './note/ShowView'
import Feature from './note/Feature'

const Wrapper = styled.div`
  width: 100%;
  max-height: 16.3rem;
  background-color: hsl(61, 100%, 81%);
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  @media ${device.tablet} {
  }
`

const NoteDiv = styled.div``

const CalDiv = styled.div``

const Note = ({ userId, noteId, year, month }) => {
  const { note } = useGetNoteByUserMonthQuery(
    { userId, year, month },
    {
      selectFromResult: ({ data }) => {
        return {
          note: data?.find((note) => note._id === noteId),
        }
      },
    }
  )

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [showEdit, setShowEdit] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [completed, setCompleted] = useState(note.completed)
  const [calValue, onChange] = useState(new Date())
  const [calOpen, setCalOpen] = useState(false)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setCompleted(note.completed)
  }, [note.title, note.content, note.completed, note.sets])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setCompleted(note.completed)
  }, [isError])

  const handleEdit = () => {
    setShowEdit((showEdit) => !showEdit)
  }
  const handleEditDate = () => {
    setCalOpen(!calOpen)
  }

  const handleOnClickCompleted = async () => {
    await updateNote({
      ...note,
      completed: !completed,
    })
  }

  const handleUnassign = async () => {
    await updateNote({
      ...note,
      assignedDate: new Date(1111, 10, 11),
    })
  }

  const handleChangeDate = async () => {
    await updateNote({
      ...note,
      assignedDate: calValue,
    })
  }

  const onClickSave = async () => {
    await updateNote({
      ...note,
      title: title,
      content: content,
    })
    setShowEdit(false)
  }

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: note.completed && 'hsl(61, 25%, 81%)',
        }}
      >
        <Feature
          note={note}
          handleOnClickCompleted={handleOnClickCompleted}
          handleEdit={handleEdit}
          handleEditDate={handleEditDate}
          handleUnassign={handleUnassign}
        />

        <NoteDiv>
          {showEdit && (
            <EditView
              title={title}
              content={content}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onClickSave={onClickSave}
            />
          )}
          {!showEdit && <ShowView title={title} content={content} />}

          {calOpen && (
            <CalDiv>
              <Calendar onChange={onChange} value={calValue} />
              <p>{calValue.toDateString()}</p>
              <button onClick={handleChangeDate}>Change Date</button>
            </CalDiv>
          )}
        </NoteDiv>
      </Wrapper>
    </>
  )
}

// const MemoizedNote = memo(Note)

// export default MemoizedNote
export default Note
