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

const Header = ({
  curDid,
  curMid,
  setCurMid,
  onMoveClicked,
  onCopyClicked,
  selectedDids,
  setSelectedDids,
}) => {
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
        {selectedDids.filter((did) => did !== '19691231').length <= 1 && (
          <div className={styles.btn} onClick={onMoveClicked}>
            Move
          </div>
        )}
        {selectedDids.filter((did) => did !== '19691231').length > 1 && (
          <div
            className={styles.btn}
            onClick={() =>
              setSelectedDids((dids) => dids.filter((did) => did === curDid))
            }
          >
            deselect
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
