import Head from 'next/head'
import styles from '../styles/Index.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Home({ initialPersistValue }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>SimpleTodo - free online todolist</title>
        <meta
          name='description'
          content='Web to do list to manage your personal work. online todo list free. Web todo list.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <section className={styles.mainSection}>
          <Image src='/postsbackground.png' width='585' height='330' />
          <div className={styles.mainSectionTextWrapper}>
            <div>
              <h1 className={styles.heading}>Free Online Todo List.</h1>
              <h1 className={styles.heading}>Make a list.</h1>
              <h1 className={styles.heading}>Manage your work.</h1>
              <Link href='/login'>
                <div className={styles.signinbutton}> Start Free</div>
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.subSection}>
          <div className={styles.subSectionTextWrapper}>
            <h2 className={styles.heading2}>
              Focus what you need to do today.
            </h2>
            <p className={styles.paragraph}>
              With daily view, focus what you need to do today and don&rsquo;t
              be bothered with other things.
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
            <p className={styles.paragraph}>
              You can plan and organize your list of todos with weekly view.
              Assign them to different date if you can&rsquo;t make it done.
            </p>
          </div>
        </section>
        <section className={styles.subSection}>
          <div className={styles.subSectionTextWrapper}>
            <h2 className={styles.heading2}>See how much you have achieved.</h2>
            <p>Monthly view is just like a calendar.</p>
            <p className={styles.paragraph}>
              You can see which days you have or haven&rsquo;t achieved all your
              todos at a glance.
            </p>
          </div>
          <Image src='/monthlyView.png' width='550' height='500' />
        </section>
        <section className={`${styles.subSection} ${styles.subSectionLast}`}>
          <div>
            <h2 className={styles.heading2}>
              Make it Unassigned if you are not sure.
            </h2>
            You know you need to do but don&rsquo;t know when?
            <p className={styles.paragraph}>You can put them to Unassigned.</p>
          </div>
          <Image src='/note.png' width='375' height='153' />
        </section>
      </div>
      <footer className={styles.footer}>
        <p>Copyright &copy; 2022 SimpleToDo. All Rights Reserved.</p>
        <Link href='/termsofuse'>
          <div className={styles.pointer}>Terms of Use</div>
        </Link>
        <Link href='/privacyPolicy'>
          <div className={styles.pointer}>Privacy Policy</div>
        </Link>
      </footer>
    </div>
  )
}
