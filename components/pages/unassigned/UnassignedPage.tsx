import React from 'react'
import styles from './unassigned_page.module.css'
import useUserAuth from '../../../hooks/useUserAuth'
import Notes from './Notes'

const UnassignedPage = () => {
  const userId: string = useUserAuth()

  return (
    <div>
      <div className={styles.title}>Unassigned Notes</div>
      <Notes userId={userId} />
    </div>
  )
}

export default UnassignedPage
