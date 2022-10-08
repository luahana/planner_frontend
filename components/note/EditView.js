import React, { useState, useEffect } from 'react'
import styles from './edit_view.module.css'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'

const EditView = ({
  note,
  oneLoading,
  setOneLoading,
  removeNewNote,
  openEdit,
}) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [])

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
    openEdit(false)
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
