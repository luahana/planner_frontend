import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { device } from '../../config/deviceBreakpoint'
import EditView from './note/EditView'
import ShowView from './note/ShowView'
import Feature from './note/Feature'
import Calendar from './note/Calendar'
import { convertDateStrToDid } from '../../lib/calendar'
import ClipLoader from 'react-spinners/ClipLoader'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 16.3rem;
  background-color: #fdff9e;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  @media ${device.tablet} {
  }
`

const NoteDiv = styled.div`
  position: relative;
`

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`

const Note = ({ view, note, curDateStr, setNewNotes }) => {
  const curDate = new Date(curDateStr)
  const did = convertDateStrToDid(curDateStr)
  const year = curDate.getFullYear()
  const month = curDate.getMonth() + 1
  const date = curDate.getDate()
  const [mid, setMid] = useState(
    year.toString() +
      month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })
  )

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [showEdit, setShowEdit] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [completed, setCompleted] = useState(note.completed)
  const [showCal, setShowCal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (view === 'unassigned') {
      const dt = new Date()
      const year = dt.getFullYear()
      const month = dt.getMonth() + 1
      setMid(
        year.toString() +
          month.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })
      )
    }
  }, [])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

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
    if (showCal) setShowCal(false)
    setShowEdit((showEdit) => !showEdit)
  }
  const handleEditDate = () => {
    if (showEdit) setShowEdit(false)
    setShowCal((showCal) => !showCal)
  }

  const handleOnClickCompleted = async () => {
    if (note.newNoteNum) {
      setNewNotes((prev) => {
        return prev.filter((n) => n.newNoteNum !== note.newNoteNum)
      })
    }
    await updateNote({
      ...note,
      completed: !completed,
    })
  }

  const handleUnassign = async () => {
    if (note.newNoteNum) {
      setNewNotes((prev) => {
        return prev.filter((n) => n.newNoteNum !== note.newNoteNum)
      })
    }
    await updateNote({
      ...note,
      assignedDate: new Date(1111, 10, 11),
    })
  }

  const handleChangeDate = async (curDate, tobeDate) => {
    if (curDate.getTime() !== tobeDate.getTime()) {
      if (note.newNoteNum) {
        setNewNotes((prev) => {
          return prev.filter((n) => n.newNoteNum !== note.newNoteNum)
        })
      }
      await updateNote({
        ...note,
        curDate: curDate,
        assignedDate: tobeDate,
      })
    }
  }

  const onClickSave = async () => {
    if (note.title !== title || note.content !== content) {
      if (note.newNoteNum) {
        setNewNotes((prev) => {
          return prev.filter((n) => n.newNoteNum !== note.newNoteNum)
        })
      }
      await updateNote({
        ...note,
        title: title,
        content: content,
      })
    }

    setShowEdit(false)
  }

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: note.completed && 'hsl(61, 25%, 81%)',
        }}
      >
        {loading && (
          <LoadingWrapper>
            <ClipLoader color='aqua' size={60} aria-label='Loading Spinner' />
          </LoadingWrapper>
        )}

        <Feature
          note={note}
          did={did}
          handleOnClickCompleted={handleOnClickCompleted}
          handleEdit={handleEdit}
          handleEditDate={handleEditDate}
          handleUnassign={handleUnassign}
          setShowEdit={setShowEdit}
          setShowCal={setShowCal}
          setLoading={setLoading}
          setNewNotes={setNewNotes}
        />
        <NoteDiv>
          <ShowView title={title} content={content} />
          {showEdit && (
            <EditView
              title={title}
              content={content}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onClickSave={onClickSave}
              loading={loading}
            />
          )}
          {showCal && (
            <Calendar
              view={view}
              mid={mid}
              curDateStr={curDateStr}
              handleChangeDate={handleChangeDate}
              setShowCal={setShowCal}
            />
          )}
        </NoteDiv>
      </Wrapper>
    </>
  )
}
export default Note
