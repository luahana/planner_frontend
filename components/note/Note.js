import React, { useState, useEffect } from 'react'
import styles from './note.module.css'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import EditView from './EditView'
import ShowView from './ShowView'
import Header from './Header'
import EditDateView from './EditDate/EditDateView'
import { didFromDate } from '../../lib/date'
import { updateNewNotes } from '../../lib/note'
import Loading from '../common/Loading'

const Note = ({ view, note, curDate, setNewNotes }) => {
  const did = didFromDate(curDate)

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [completed, setCompleted] = useState(note.completed)
  const [showEdit, setShowEdit] = useState(false)
  const [showCal, setShowCal] = useState(false)
  const [oneLoading, setOneLoading] = useState(false)

  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setCompleted(note.completed)
  }, [note.title, note.content, note.completed, note.sets, isError])

  const handleEdit = () => {
    if (showCal) setShowCal(false)
    setShowEdit(true)
  }
  const handleEditDate = () => {
    if (showEdit) setShowEdit(false)
    setShowCal(true)
  }

  const handleCompleted = async () => {
    if (oneLoading) return
    updateNewNotes(note.newNoteNum, setNewNotes)
    await updateNote({
      ...note,
      completed: !completed,
    })
  }

  const handleUnassign = async () => {
    if (oneLoading) return
    updateNewNotes(note.newNoteNum, setNewNotes)
    await updateNote({
      ...note,
      assigned: false,
      assignedTime: 0,
      curDate: curDate.getTime(),
    })
  }

  const handleMove = async (tobeDate) => {
    if (oneLoading) return
    if (curDate.getTime() !== tobeDate.getTime()) {
      updateNewNotes(note.newNoteNum, setNewNotes)
      await updateNote({
        ...note,
        assigned: true,
        curDate: curDate.getTime(),
        assignedTime: tobeDate.getTime(),
      })
    }
    setShowCal(false)
  }
  const handleCopy = async (tobeDate) => {
    if (oneLoading) return
    if (curDate.getTime() !== tobeDate.getTime()) {
      await updateNote({
        ...note,
        assigned: true,
        curDate: curDate.getTime(),
        assignedTime: tobeDate.getTime(),
        _id: undefined,
      })
    }
    setShowCal(false)
  }

  const handleSaveNote = async () => {
    if (oneLoading) return
    if (note.title !== title || note.content !== content) {
      updateNewNotes(note.newNoteNum, setNewNotes)
      await updateNote({
        ...note,
        title: title,
        content: content,
      })
    }
    setShowEdit(false)
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: note.completed && 'hsl(61, 25%, 81%)',
      }}
    >
      {oneLoading && <Loading size={60} />}
      <Header
        view={view}
        note={note}
        did={did}
        handleCompleted={handleCompleted}
        handleEdit={handleEdit}
        handleEditDate={handleEditDate}
        handleUnassign={handleUnassign}
        setNewNotes={setNewNotes}
        setOneLoading={setOneLoading}
      />
      <div className={styles.note}>
        <ShowView title={title} content={content} />
        {showEdit && (
          <EditView
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            handleSaveNote={handleSaveNote}
          />
        )}
        {showCal && (
          <EditDateView
            view={view}
            curDate={curDate}
            handleMove={handleMove}
            handleCopy={handleCopy}
          />
        )}
      </div>
    </div>
  )
}
export default Note
