import React from 'react'
import styles from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

type Props = {
  title: React.ReactNode
  prev: string
  next: string
}

const Header = ({ title, prev, next }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Link href={prev}>
        <div className={styles.prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </Link>
      <div className={styles.title}>{title}</div>
      <Link href={next}>
        <div className={styles.next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
    </div>
  )
}

export default Header
