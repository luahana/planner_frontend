import React from 'react'
import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2022 SimpleToDo. All Rights Reserved.</p>
      <div>Terms</div>
      <div>Privacy Policy</div>
    </footer>
  )
}

export default Footer
