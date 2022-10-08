import React, { useEffect } from 'react'
import styles from './header.module.css'
import { calcMid } from '../../../lib/calendar'
import {
  ymdFromMid,
  dateFromDid,
  addZero,
  didFromDate,
} from '../../../lib/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useUpdateNoteMutation } from '../../../redux/slice/api/notesApiSlice'

const Header = ({
  note,
  curMid,
  setCurMid,
  removeNewNote,
  oneLoading,
  setOneLoading,
  openCal,
  selectedDids,
  setSelectedDids,
}) => {
  const curDate = new Date(note.assignedTime)
  const curDid = didFromDate(curDate)
  const { year, month } = ymdFromMid(curMid)

  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading])

  const handleMove = async () => {
    if (oneLoading) return

    const didsToMove = selectedDids.filter((did) => did !== '19691231')
    if (didsToMove.length !== 1 || didsToMove[0] === '19691231') return

    const tobeDate = dateFromDid(didsToMove[0])
    if (note.assignedTime !== tobeDate.getTime()) {
      removeNewNote(note)
      await updateNote({
        ...note,
        assigned: true,
        curDate: note.assignedTime,
        assignedTime: tobeDate.getTime(),
      })
    }
    openCal(false)
  }
  const handleCopy = async () => {
    if (oneLoading) return

    const didsToCopy = selectedDids.filter((did) => did !== '19691231')
    if (didsToCopy.length === 0) return

    const tobeDates = didsToCopy.map((did) => dateFromDid(did))
    for (let i = 0; i < tobeDates.length; i++) {
      if (note.assignedTime !== tobeDates[i].getTime()) {
        await updateNote({
          ...note,
          assigned: true,
          curDate: note.assignedTime,
          assignedTime: tobeDates[i].getTime(),
          _id: undefined,
        })
      }
    }
    openCal(false)
  }
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
        <div className={styles.btn} onClick={handleCopy}>
          Copy
        </div>
        {selectedDids.filter((did) => did !== '19691231').length <= 1 && (
          <div className={styles.btn} onClick={handleMove}>
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
