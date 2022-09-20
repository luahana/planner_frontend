import React, { useState } from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../config/calendar'
import { useGetNotesQuery } from '../redux/slice/api/notesApiSlice'
// import Modal from '../Modal'
import Note from './Note'
import Time from './Time'
import { device } from '../config/deviceBreakpoint'

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

const DayNotes = ({ view, user_id, month, day, weekday, year }) => {
  const {
    data: notes,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error {error?.data?.message}</p>
  if (!isLoading && isSuccess) {
    const { ids, entities } = notes

    const filteredIds = [...ids].filter((id) => {
      let assignedDate = entities[id].createdAt

      if (entities[id].assignedDate) {
        assignedDate = entities[id].assignedDate
      }
      const [assignedDateMonth, assignedDateDay, assignedDateYear] = [
        new Date(assignedDate).getMonth(),
        new Date(assignedDate).getDate(),
        new Date(assignedDate).getFullYear(),
      ]
      return (
        entities[id].user._id === user_id &&
        assignedDateMonth === month &&
        assignedDateDay === day &&
        assignedDateYear === year
      )
    })
    content = filteredIds
      .sort((a, b) => {
        return entities[a].completed === entities[b].completed
          ? 0
          : entities[a].completed
          ? 1
          : -1
      })
      .map((id) => {
        return (
          <Note
            key={id}
            noteId={id}
            userId={user_id}
            noteTitle={entities[id].title}
            noteContent={entities[id].content}
            noteCompleted={entities[id].completed}
            noteSets={entities[id].sets}
            noteAssignedDate={
              entities[id].addignedDate
                ? entities[id].addignedDate
                : entities[id].createdAt
            }
            isFetching={isFetching}
          />
        )
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

export default DayNotes
