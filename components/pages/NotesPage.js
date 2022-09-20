import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import useUserAuth from '../../hooks/useUserAuth'
import { device } from '../../config/deviceBreakpoint'
import DayNotes from '../DayNotes'

const Wrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const NotesPage = () => {
  const user_id = useUserAuth()
  const [openModal, setOpenModal] = useState(false)
  const today = new Date()
  const [month, day, year] = [
    today.getMonth(),
    today.getDate(),
    today.getFullYear(),
  ]

  return (
    <>
      <Modal
        user_id={user_id}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Wrapper>
        <DayNotes
          view='day'
          user_id={user_id}
          month={month}
          day={day}
          year={year}
        />
      </Wrapper>
    </>
  )
}

export default NotesPage
