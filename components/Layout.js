import Navbar from './Navbar'
import styles from '../styles/layout.module.css'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
