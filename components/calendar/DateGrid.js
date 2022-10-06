import React from 'react'
import styled from 'styled-components'
import EditDateDay from '../note/EditDate/Day'
import MonthlyDay from '../pages/monthly/Day'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  & button:first-child {
    grid-column: 5;
  }
  width: 100%;
`

const DateGrid = ({ view, calDates, setSelectedDid, selectedDid, mid }) => {
  return (
    <Wrapper>
      {calDates.map((day) => {
        if (view === 'editDate')
          return (
            <EditDateDay
              key={day}
              day={day}
              selectedDid={selectedDid}
              setSelectedDid={setSelectedDid}
              mid={mid}
            />
          )
        if (view === 'month' || view == 'monthSmall') {
          return <MonthlyDay view={view} key={day} day={day} mid={mid} />
        }
      })}
    </Wrapper>
  )
}

export default DateGrid
