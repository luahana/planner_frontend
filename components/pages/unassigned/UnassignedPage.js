import React from 'react'
import styles from './unassigned_page.module.css'
import useUserAuth from '../../../hooks/useUserAuth'
import Notes from './Notes'

const UnassignedPage = () => {
  const userId = useUserAuth()

  return (
    <div>
      <div className={styles.title}>Unassigned Notes</div>
      <Notes userId={userId} curDate={new Date()} />
    </div>
  )
}

export default UnassignedPage
