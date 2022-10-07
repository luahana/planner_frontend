import React from 'react'
import styles from './header.module.css'
import { calcMid } from '../../../lib/calendar'
import { ymdFromMid } from '../../../lib/date'
import { addZero } from '../../../lib/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

const Header = ({ curMid, setCurMid, onMoveClicked, onCopyClicked }) => {
  const { year, month } = ymdFromMid(curMid)
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div
          className={styles.arrow}
          onClick={() => setCurMid(calcMid(curMid, -1))}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div>{`${year} ${addZero(month)}`}</div>
        <div
          className={styles.arrow}
          onClick={() => setCurMid(calcMid(curMid, 1))}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.btn} onClick={onCopyClicked}>
          Copy
        </div>
        <div className={styles.btn} onClick={onMoveClicked}>
          Move
        </div>
      </div>
    </div>
  )
}

export default Header
