import Link from 'next/link'
import React from 'react'
import styles from '../styles/Login.module.css'

const login = () => {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form}>
        <input className={styles.input} type='text' placeholder='email' />
        <input
          className={styles.input}
          type='password'
          placeholder='password'
        />

        <button className={styles.submit} type='submit'>
          Log in
        </button>
      </form>
      <Link href='/signup'>
        <a>Don't have an accout? Sign up!</a>
      </Link>
    </div>
  )
}

export default login
