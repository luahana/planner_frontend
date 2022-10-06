import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { getCalDates } from '../../../lib/calendar'
import { didFromDate, midFromDate, dateFromDid } from '../../../lib/date'

import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #ff7eb9;
  position: absolute;
  top: 0;
  z-index: 100;
`

const EditDateView = ({ view, curDate, handleChangeDate }) => {
  const curDid = didFromDate(curDate)

  const [selectedDid, setSelectedDid] = useState(curDid)
  const [curMid, setCurMid] = useState(midFromDate(curDate))
  const [calDates, setCalDates] = useState(getCalDates(curMid))

  useEffect(() => {
    if (view === 'unassigned') {
      setCurMid(midFromDate(new Date()))
    }
  }, [])

  useEffect(() => {
    setCalDates(getCalDates(curMid))
  }, [curMid])

  const onChangeClicked = () => {
    handleChangeDate(dateFromDid(selectedDid))
  }
  return (
    <Wrapper>
      <Header
        curMid={curMid}
        setCurMid={setCurMid}
        onChangeClicked={onChangeClicked}
      />
      <Calendar
        view='editDate'
        calDates={calDates}
        setSelectedDid={setSelectedDid}
        selectedDid={selectedDid}
        mid={curMid}
      />
    </Wrapper>
  )
}

export default EditDateView
