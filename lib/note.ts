export default interface Note {
  _id?: string
  newNoteId?: string
  user: string
  title: string
  content: string
  completed: boolean
  assigned: boolean
  assignedTime: number
  curDate: Date
  sets: boolean[]
}

export const defaultNote: Note = {
  user: '',
  title: '',
  content: '',
  completed: false,
  assigned: true,
  assignedTime: new Date().getTime(),
  curDate: new Date(0),
  sets: [],
}

export const getNote = ({
  user,
  title = '',
  content = '',
  completed = false,
  assigned = true,
  assignedTime = new Date().getTime(),
  curDate = new Date(0),
  sets = [],
}): Note => ({
  user,
  title,
  content,
  completed,
  assigned,
  assignedTime,
  curDate,
  sets,
})

export const getNewNote = ({ user, newNoteId, assignedTime }: Note) => {
  const note = getNote({ user, assignedTime })
  note.newNoteId = newNoteId
  if (assignedTime === 0) note.assigned = false
  return note
}

const objFromNormData = (data) => {
  return data.ids.map((id: number) => data.entities[id])
}

export const sortedNotesFromNormData = (newNotes: Note[] = [], data) => {
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

export const getId = (note: Note): string => {
  return note._id ?? note.newNoteId
}
