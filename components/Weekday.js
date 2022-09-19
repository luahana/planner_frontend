import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../config/calendar'
import Note from './Note'
import { useGetNotesQuery } from '../redux/slice/api/notesApiSlice'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-top: 1px solid black;
  width: 100%;
`
const DateWrapper = styled.div`
  width: 20%;
`

const NoteWrapper = styled.div`
  width: 100%;
`

const Weekday = ({ user_id, month, day, weekday, year }) => {
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
        new Date(assignedDate).getMonth() + 1,
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
    <Wrapper>
      <DateWrapper>
        <div>{WEEKDAY[weekday]}</div>
        <div>
          {MONTH[month]} {day}
        </div>
      </DateWrapper>

      <NoteWrapper>{content}</NoteWrapper>
    </Wrapper>
  )
}

export default Weekday
