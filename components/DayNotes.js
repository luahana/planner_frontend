import React, { memo } from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../config/calendar'
import { useGetNoteByUserDayQuery } from '../redux/slice/api/notesApiSlice'
// import Modal from '../Modal'
import MemoizedNote from './Note'
import Time from './Time'
import { device } from '../config/deviceBreakpoint'

// Day View styled component start
const DayWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const DayHeader = styled.div`
  padding: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
  }
`

const DayNewNoteBtnDiv = styled.div``

const DayMain = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`
// Day View styled component end

// Week View styled component start
const WeekWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-top: 1px solid black;
  width: 100%;
`
const WeekDateWrapper = styled.div`
  width: 20%;
`

const WeekNoteWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`
// Week View styled component end

const DayNotes = ({ view, user_id, year, month, day, weekday }) => {
  const date =
    year.toString() +
    month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    day.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  const queryStr = user_id + date
  const {
    data: notes,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNoteByUserDayQuery(queryStr, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error {error?.data?.message}</p>
  if (!isLoading && isSuccess) {
    const { ids, entities } = notes
    content = [...ids]
      .sort((a, b) => {
        return entities[a].completed === entities[b].completed
          ? 0
          : entities[a].completed
          ? 1
          : -1
      })
      .map((id) => {
        return <MemoizedNote key={id} noteId={id} queryStr={queryStr} />
      })
  }
  return (
    <>
      {view === 'day' && (
        <DayWrapper>
          <DayHeader>
            <Time />
            <DayNewNoteBtnDiv>
              <button>New Note</button>
            </DayNewNoteBtnDiv>
          </DayHeader>
          <DayMain>{content}</DayMain>
        </DayWrapper>
      )}
      {view === 'week' && (
        <WeekWrapper>
          <WeekDateWrapper>
            <div>{WEEKDAY[weekday]}</div>
            <div>
              {MONTH[month]} {day}
            </div>
            <div>
              <button>Add New</button>
            </div>
          </WeekDateWrapper>

          <WeekNoteWrapper>{content}</WeekNoteWrapper>
        </WeekWrapper>
      )}
    </>
  )
}

const MemoizedDayNotes = memo(DayNotes)
export default MemoizedDayNotes
