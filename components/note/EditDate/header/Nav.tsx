import React from 'react'
import styles from './nav.module.css'
import { calcMid } from '../../../../lib/calendar'
import { ymdFromMid, addZero } from '../../../../lib/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { ymd } from '../../../../lib/date'

const Nav = ({ curMid, setCurMid }) => {
  const { year, month }: ymd = ymdFromMid(curMid)
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.arrow}
        onClick={() => setCurMid(calcMid(curMid, -1))}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div>{`${year} ${addZero(month.toString())}`}</div>
      <div
        className={styles.arrow}
        onClick={() => setCurMid(calcMid(curMid, 1))}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}

export default Nav
