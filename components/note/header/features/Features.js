import styles from './features.module.css'
import Edit from './Edit'
import Calendar from './Calendar'
import Unassign from './Unassign'
import Delete from './Delete'

const Features = ({ view, note, removeNewNote }) => {
  return (
    <div className={styles.wrapper}>
      <Edit note={note} />
      <Calendar note={note} />
      {view !== 'unassigned' && (
        <Unassign note={note} removeNewNote={removeNewNote} />
      )}
      <Delete note={note} removeNewNote={removeNewNote} />
    </div>
  )
}

export default Features
