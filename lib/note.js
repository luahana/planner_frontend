export const getNote = ({
  user,
  title = '',
  content = '',
  completed = false,
  assigned = true,
  assignedTime = new Date().getTime(),
  curDate = 0,
  sets = [],
}) => ({
  user,
  title,
  content,
  completed,
  assigned,
  assignedTime,
  curDate,
  sets,
})

export const getNewNote = ({ user, newNoteNum, assignedTime }) => {
  const note = getNote({ user, assignedTime })
  note.newNoteNum = newNoteNum
  if (assignedTime === 0) note.assigned = false
  return note
}

const objFromNormData = (data) => {
  return data.ids.map((id) => data.entities[id])
}

export const sortedNotesFromNormData = (newNotes, data) => {
  const obj = objFromNormData(data)
  return [...newNotes, ...notesSortedByCompleted(obj)]
}

const notesSortedByCompleted = (notes) => {
  return notes
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .sort((a, b) => {
      if (a.completed === b.completed) return 0
      if (a.completed) return 1
      if (!a.completed) return -1
    })
}

export const updateNewNotes = (noteNum, setNewNotes) => {
  if (noteNum) {
    setNewNotes((prev) => {
      return prev.filter((n) => n.newNoteNum !== noteNum)
    })
    return noteNum
  }
}
