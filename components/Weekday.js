import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../config/calendar'
import Note from './Note'
import { useGetNotesQuery } from '../redux/slice/api/notesApiSlice'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background-color: yellow;
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
    console.log(ids)
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
      console.log(user_id)
      console.log(month)
      console.log(day)
      console.log(year)
      console.log(entities[id].user._id)
      console.log(assignedDateMonth)
      console.log(assignedDateDay)
      console.log(assignedDateYear)
      return (
        entities[id].user._id === user_id &&
        assignedDateMonth === month &&
        assignedDateDay === day &&
        assignedDateYear === year
      )
    })
    console.log('filteredIds')
    console.log(filteredIds)
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
      <div>
        <div>{WEEKDAY[weekday]}</div>
        <div>
          {MONTH[month]} {day}
        </div>
      </div>

      <div>{content}</div>
    </Wrapper>
  )
}

export default Weekday
