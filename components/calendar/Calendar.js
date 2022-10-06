import React from 'react'
import styled from 'styled-components'
import DateGrid from './DateGrid'
import Weekdays from './Weekdays'

const Wrapper = styled.div`
  width: 100%;
`

const Calendar = ({
  weekdaysView,
  view,
  calDates,
  setSelectedDid,
  selectedDid,
  mid,
}) => {
  return (
    <Wrapper>
      <Weekdays weekdaysView={weekdaysView} />
      <DateGrid
        view={view}
        calDates={calDates}
        mid={mid}
        setSelectedDid={setSelectedDid}
        selectedDid={selectedDid}
      />
    </Wrapper>
  )
}

export default Calendar
