import React, { useState, useEffect } from 'react'
import styles from './note.module.css'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import EditView from './EditView'
import ShowView from './ShowView'
import Header from './Header'
import EditDateView from './EditDate/EditDateView'
import { dateFromDid, didFromDate } from '../../lib/date'
import Loading from '../common/Loading'

const Note = ({ view, note, removeNewNote }) => {
  const did = didFromDate(new Date(note.assignedTime))

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
    setShowEdit((prev) => !prev)
  }
  const handleEditDate = () => {
    if (showEdit) setShowEdit(false)
    setShowCal((prev) => !prev)
  }

  const handleCompleted = async () => {
    if (oneLoading) return
    removeNewNote(note)
    await updateNote({
      ...note,
      completed: !completed,
    })
  }

  const handleUnassign = async () => {
    if (oneLoading) return
    removeNewNote(note)
    await updateNote({
      ...note,
      assigned: false,
      assignedTime: 0,
      curDate: note.assignedTime,
    })
  }

  const handleMove = async (tobeDate) => {
    if (oneLoading) return
    if (note.assignedTime !== tobeDate.getTime()) {
      removeNewNote(note)
      await updateNote({
        ...note,
        assigned: true,
        curDate: note.assignedTime,
        assignedTime: tobeDate.getTime(),
      })
    }
    setShowCal(false)
  }
  const handleCopy = async (tobeDids) => {
    const tobeDates = tobeDids.map((did) => dateFromDid(did))
    if (oneLoading) return
    for (let i = 0; i < tobeDates.length; i++) {
      if (note.assignedTime !== tobeDates[i].getTime()) {
        await updateNote({
          ...note,
          assigned: true,
          curDate: note.assignedTime,
          assignedTime: tobeDates[i].getTime(),
          _id: undefined,
        })
      }
    }
    setShowCal(false)
  }

  const handleSaveNote = async () => {
    if (oneLoading) return
    if (note.title !== title || note.content !== content) {
      removeNewNote(note)
      await updateNote({
        ...note,
        title: title,
        content: content,
      })
    }
    setShowEdit(false)
  }

  return (
    <div className={`${styles.wrapper} ${note.completed && styles.completed}`}>
      {oneLoading && <Loading size={60} />}
      <Header
        view={view}
        note={note}
        did={did}
        handleCompleted={handleCompleted}
        handleEdit={handleEdit}
        handleEditDate={handleEditDate}
        handleUnassign={handleUnassign}
        removeNewNote={removeNewNote}
        setOneLoading={setOneLoading}
      />
      <div className={styles.note}>
        <ShowView note={note} />
        {showEdit && (
          <>
            <div className={styles.modalBlanket} onClick={handleEdit}></div>
            <EditView
              title={title}
              content={content}
              onTitleChange={(e) => setTitle(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              handleSaveNote={handleSaveNote}
            />
          </>
        )}
        {showCal && (
          <>
            <div className={styles.modalBlanket} onClick={handleEditDate}></div>
            <EditDateView
              view={view}
              curDate={new Date(note.assignedTime)}
              handleMove={handleMove}
              handleCopy={handleCopy}
            />
          </>
        )}
      </div>
    </div>
  )
}
export default Note
