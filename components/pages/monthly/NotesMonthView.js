import React from 'react'
import SmallView from './notesViewer/SmallView'
import WideView from './notesViewer/WideView'

const NotesMonthView = ({ view, notes }) => {
  if (view === 'monthSmall') return <SmallView notes={notes} />
  return <WideView notes={notes} />
}

export default NotesMonthView
