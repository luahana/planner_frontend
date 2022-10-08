import React, { useState, useEffect } from 'react'
import styles from './edit_view.module.css'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import {
  setIsLoading,
  setModalOpen,
  selectNote,
} from '../../redux/slice/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../lib/note'

const EditView = ({ note, removeNewNote }) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
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
        id: getId(note),
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
