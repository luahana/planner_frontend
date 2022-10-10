import Features from './features/Features'
import styles from './header.module.css'
import Completed from './Completed'
import Note from '../../../lib/note'

type Props = {
  view?: string
  note: Note
  removeNewNote: (note: Note) => string
}

const Header = ({ view, note, removeNewNote }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Completed note={note} removeNewNote={removeNewNote} />
      <Features view={view} note={note} removeNewNote={removeNewNote} />
    </div>
  )
}

export default Header
