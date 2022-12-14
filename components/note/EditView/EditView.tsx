import React, { useState, useEffect, useRef } from 'react'
import styles from './edit_view.module.css'
import { useUpdateNoteMutation } from '../../../redux/slice/api/notesApiSlice'
import {
  setIsLoading,
  setModalClose,
  selectNote,
} from '../../../redux/slice/notesSlice'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { getId } from '../../../lib/note'
import Note from '../../../lib/note'

type Props = {
  note: Note
  removeNewNote: (newNote: Note) => string
}

const EditView = ({ note, removeNewNote }: Props) => {
  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))
  const [title, setTitle] = useState<string>(note.title)
  const [content, setContent] = useState<string>(note.content)
  const titleRef = useRef<HTMLInputElement>(null)
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    titleRef.current.focus()
  }, [])

  const handleSaveNote = async () => {
    if (noteState.isLoading) return
    if (note.title !== title || note.content !== content) {
      removeNewNote(note)
      let updatedNote: Note
      if (!note.assigned) {
        updatedNote = {
          ...note,
          title: title,
          content: content,
          assignedTime: 0,
        }
      } else {
        updatedNote = { ...note, title: title, content: content }
      }
      await updateNote(updatedNote)
    }
    dispatch(setModalClose({ id: getId(note) }))
  }
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.title}
        type='text'
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className={styles.save} onClick={handleSaveNote}>
        Save
      </button>
    </div>
  )
}

export default EditView
