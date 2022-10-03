import Navbar from './Navbar'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
