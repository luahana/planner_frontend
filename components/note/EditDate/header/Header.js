import React from 'react'
import styles from './header.module.css'
import Buttons from './buttons/Buttons'
import Nav from './Nav'

const Header = ({ note, curMid, setCurMid, removeNewNote }) => {
  return (
    <div className={styles.wrapper}>
      <Nav curMid={curMid} setCurMid={setCurMid} />
      <Buttons note={note} removeNewNote={removeNewNote} />
    </div>
  )
}

export default Header
