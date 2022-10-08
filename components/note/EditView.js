import React, { useState, useEffect } from 'react'
import styles from './edit_view.module.css'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { setIsLoading, setModalOpen } from '../../redux/slice/notesSlice'
import { useDispatch, useSelector } from 'react-redux'

const EditView = ({ note, removeNewNote }) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const [updateNote, { isLoading }] = useUpdateNoteMutation()
  const dispatch = useDispatch()
  const noteState = useSelector(
    (state) => state.notes[note._id ?? note.newNoteNum]
  )
  useEffect(() => {
    dispatch(setIsLoading({ id: note._id ?? note.newNoteNum, isLoading }))
  }, [isLoading])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [])

  const handleSaveNote = async () => {
    if (noteState.isLoading) return
    if (note.title !== title || note.content !== content) {
      removeNewNote(note)
      await updateNote({
        ...note,
        title: title,
        content: content,
      })
    }
    dispatch(
      setModalOpen({
        id: note._id ?? note.newNoteNum,
        isEditOpen: false,
        isCalOpen: false,
      })
    )
  }
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.title}
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.save} onClick={handleSaveNote}>
        Save
      </div>
    </div>
  )
}

export default EditView
