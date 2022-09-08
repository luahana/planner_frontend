import Head from 'next/head'
import styles from '../styles/Index.module.css'

export default function Home() {
  // const date = new Date()
  // const today = new Intl.DateTimeFormat('en-US', {
  //   dateStyle: 'full',
  //   timeStyle: 'long',
  // }).format(date)

  return (
    <div className={styles.container}>
      <Head>
        <title>Planner App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Welcome!</h1>
      {/* <p></p>
      <div className={styles.block}></div> */}
    </div>
  )
}
