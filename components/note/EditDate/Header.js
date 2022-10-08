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
import {
  setIsLoading,
  setModalOpen,
  selectNote,
  setSelectedDids,
} from '../../../redux/slice/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../../lib/note'

const Header = ({ note, curMid, setCurMid, removeNewNote }) => {
  const curDate = new Date(note.assignedTime)
  const curDid = didFromDate(curDate)
  const { year, month } = ymdFromMid(curMid)

  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  const handleMove = async () => {
    if (noteState.isLoading) return

    const didsToMove = noteState.selectedDids.filter(
      (did) => did !== '19691231'
    )
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
    dispatch(
      setModalOpen({
        id: getId(note),
        isEditOpen: false,
        isCalOpen: false,
      })
    )
  }
  const handleCopy = async () => {
    if (noteState.isLoading) return

    const didsToCopy = noteState.selectedDids.filter(
      (did) => did !== '19691231'
    )
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
    dispatch(
      setModalOpen({
        id: getId(note),
        isEditOpen: false,
        isCalOpen: false,
      })
    )
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
        {noteState.selectedDids.filter((did) => did !== '19691231').length <=
          1 && (
          <div className={styles.btn} onClick={handleMove}>
            Move
          </div>
        )}
        {noteState.selectedDids.filter((did) => did !== '19691231').length >
          1 && (
          <div
            className={styles.btn}
            onClick={() =>
              dispatch(
                setSelectedDids({
                  id: getId(note),
                  selectedDids: [],
                })
              )
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
