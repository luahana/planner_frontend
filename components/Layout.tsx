import Navbar from './Navbar'
import styles from '../styles/layout.module.css'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
