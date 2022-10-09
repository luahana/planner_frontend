import React from 'react'
import styles from './weeks.module.css'
import { widsMonth } from '../../../lib/calendar'
import Link from 'next/link'

const Weeks = ({ year, month, string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.empty}></div>
      {widsMonth({ year, month }).map((wid) => (
        <Link key={wid} href={`/weekly/${wid}`}>
          <button
            className={`${styles.week} ${
              string.length === 2 && styles.shortStr
            }`}
          >
            {/* <div className={styles.month}>{`${wid.slice(4, 6)}`}</div> */}
            <div className={styles.str}>{string}</div>
            {/* <div className={styles.weekNum}>{`${wid.slice(-1)}`}</div> */}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Weeks
