import { useState } from 'react'

const useNoteModal = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCalOpen, setIsCalOpen] = useState(false)

  const openEdit = (open) => {
    setIsEditOpen(open)
  }
  const openCal = (open) => {
    setIsCalOpen(open)
  }

  const closeAll = () => {
    setIsEditOpen(false)
    setIsCalOpen(false)
  }

  return [isEditOpen, openEdit, isCalOpen, openCal, closeAll]
}

export default useNoteModal
