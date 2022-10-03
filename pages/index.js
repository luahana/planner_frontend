import Head from 'next/head'
import styles from '../styles/Index.module.css'
import Image from 'next/image'

export default function Home({ initialPersistValue }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SimpleTodo</title>
        <meta
          name='description'
          content='Web to do list to manage your personal work'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <section className={styles.mainSection}>
          <Image src='/postsbackground.png' width='585' height='330' />
          <div className={styles.mainSectionTextWrapper}>
            <div>
              <h1 className={styles.heading}>Free Web To Do List.</h1>
              <h1 className={styles.heading}>Make a list.</h1>
              <h1 className={styles.heading}>Achieve.</h1>

              <div className={styles.signinbutton}> Start Free</div>
            </div>
          </div>
        </section>

        <section className={styles.subSection}>
          <div className={styles.subSectionTextWrapper}>
            <h2 className={styles.heading2}>
              Focus what you need to do today.
            </h2>
            <p>
              With daily view, focus what you need to do today and don't be
              bothered with other things.
            </p>
          </div>
          <Image src='/dailyView.png' width='500' height='400' />
        </section>
        <div className={styles.midTitle}>
          <h1 className={styles.heading}>
            Replace your posts at your home or office.
          </h1>
        </div>
        <section className={styles.subSection}>
          <Image src='/weeklyView.png' width='500' height='600' />
          <div className={styles.subSectionTextWrapper}>
            <h2 className={styles.heading2}>Plan and organize your week.</h2>
            <p>
              You can plan and organize your list of todos with weekly view.
              Assign them to different date if you can't make it done.
            </p>
          </div>
        </section>
        <section className={styles.subSection}>
          <div className={styles.subSectionTextWrapper}>
            <h2 className={styles.heading2}>See how much you have achieved.</h2>
            <p>Monthly view is just like a calendar.</p>
            <p>
              You can see which days you have or haven't achieved all your todos
              at a glance.
            </p>
          </div>
          <Image src='/monthlyView.png' width='550' height='500' />
        </section>
        <section className={styles.subSection}>
          <div>
            <h2>Make it Unassigned if you are not sure.</h2>
            You know you need to do but don't know when?
            <p>You can put them to Unassigned.</p>
          </div>
          <Image src='/note.png' width='375' height='153' />
        </section>
      </div>
    </div>
  )
}
