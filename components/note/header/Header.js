import Features from './features/Features'
import styles from './header.module.css'
import Completed from './Completed'

const Header = ({ view, note, removeNewNote }) => {
  return (
    <div className={styles.wrapper}>
      <Completed note={note} removeNewNote={removeNewNote} />
      <Features view={view} note={note} removeNewNote={removeNewNote} />
    </div>
  )
}

export default Header
