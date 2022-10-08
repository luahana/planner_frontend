import React, { useState } from 'react'
import styles from './note.module.css'
import EditView from './EditView'
import ShowView from './ShowView'
import Header from './Header'
import EditDateView from './EditDate/EditDateView'
import Loading from '../common/Loading'
import useNoteModal from '../../hooks/useNoteModal'

const Note = ({ view, note, removeNewNote }) => {
  const [isEditOpen, openEdit, isCalOpen, openCal, closeAll] = useNoteModal()
  const [oneLoading, setOneLoading] = useState(false)

  return (
    <div className={`${styles.wrapper} ${note.completed && styles.completed}`}>
      {oneLoading && <Loading size={60} />}
      <Header
        view={view}
        note={note}
        oneLoading={oneLoading}
        setOneLoading={setOneLoading}
        openEdit={openEdit}
        openCal={openCal}
        removeNewNote={removeNewNote}
      />
      <div className={styles.note}>
        <ShowView note={note} />
        {isEditOpen && (
          <>
            <div className={styles.modalBlanket} onClick={closeAll}></div>
            <EditView
              note={note}
              oneLoading={oneLoading}
              setOneLoading={setOneLoading}
              removeNewNote={removeNewNote}
              openEdit={openEdit}
            />
          </>
        )}
        {isCalOpen && (
          <>
            <div className={styles.modalBlanket} onClick={closeAll}></div>
            <EditDateView
              view={view}
              note={note}
              oneLoading={oneLoading}
              setOneLoading={setOneLoading}
              removeNewNote={removeNewNote}
              openCal={openCal}
            />
          </>
        )}
      </div>
    </div>
  )
}
export default Note
