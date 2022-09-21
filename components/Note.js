import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components'
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from '../redux/slice/api/notesApiSlice'
import ElementMaker from './ElementMaker'
import TextareaMaker from './TextareaMaker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { device } from '../config/deviceBreakpoint'

const Wrapper = styled.div`
  width: 100%;
  max-height: 16.3rem;
  background-color: AntiqueWhite;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  @media ${device.tablet} {
  }
`

const FeatureDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  padding-top: 1rem;
`

const SetsDiv = styled.div`
  display: flex;
  gap: 1rem;
`

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  @media ${device.tablet} {
  }
`

const CompletedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
  @media ${device.tablet} {
  }
`
const DeleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
  @media ${device.tablet} {
  }
`

const ContentDiv = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  @media ${device.tablet} {
  }
`

const SetCompleted = styled.div`
  cursor: pointer;
`

const Note = ({ noteId, noteAssignedDate }) => {
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  })

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror,
    },
  ] = useDeleteNoteMutation()

  const [showInputEle, setShowInputEle] = useState(false)
  const [showContentInputEle, setShowContentInputEle] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [completed, setCompleted] = useState(note.completed)
  const [sets, setSets] = useState(note.sets)

  useEffect(() => {
    if (!showInputEle && !showContentInputEle) {
      setTitle(note.title)
      setContent(note.content)
      setCompleted(note.completed)
      setSets(note.sets)
    }
  }, [isError, isDelError])

  const handleBlur = async () => {
    setShowInputEle(false)
    if (note.title !== title) {
      await updateNote({
        _id: noteId,
        user: note.user._id,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
        sets,
      })
    }
  }
  const handleBlurContent = async () => {
    setShowContentInputEle(false)
    if (note.content !== content) {
      await updateNote({
        _id: noteId,
        user: note.user._id,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
        sets,
      })
    }
  }

  const handleCompletedOnClick = async () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    const newSets = new Array()
    newSets.length = sets.length
    if (!newCompleted) {
      newSets.fill(false)
      setSets(newSets)
    } else {
      newSets.fill(true)
      setSets(newSets)
    }

    await updateNote({
      _id: noteId,
      user: note.user._id,
      title,
      content,
      completed: newCompleted,
      assignedDate: noteAssignedDate,
      sets: newSets,
    })
  }

  const handleSetOnClick = async (i) => {
    const newSets = sets.slice()
    newSets[i] = !sets[i]
    setSets(newSets)
    const allCompleted = newSets.every((set) => set === true)
    if (allCompleted) setCompleted(allCompleted)

    await updateNote({
      _id: noteId,
      user: note.user._id,
      title,
      content,
      completed: allCompleted,
      assignedDate: noteAssignedDate,
      sets: newSets,
    })
  }

  const handleDelete = async () => {
    await deleteNote({ id: noteId })
  }

  return (
    <Wrapper>
      <FeatureDiv>
        <CompletedDiv onClick={handleCompletedOnClick}>
          {note.completed ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </CompletedDiv>
        <SetsDiv>
          {sets &&
            sets.map((set, i) => (
              <SetCompleted key={i} onClick={() => handleSetOnClick(i)}>
                {set ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faCircle} />
                )}
              </SetCompleted>
            ))}
        </SetsDiv>
        <DeleteDiv onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteDiv>
      </FeatureDiv>
      <TitleDiv>
        <ElementMaker
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
          handleDoubleClick={() => setShowInputEle(true)}
          handleBlur={handleBlur}
          showInputEle={showInputEle}
        />
      </TitleDiv>
      <ContentDiv>
        <TextareaMaker
          value={content}
          handleChange={(e) => setContent(e.target.value)}
          handleDoubleClick={() => setShowContentInputEle(true)}
          handleBlur={handleBlurContent}
          showContentInputEle={showContentInputEle}
        />
      </ContentDiv>
    </Wrapper>
  )
}

const MemoizedNote = memo(Note)

export default MemoizedNote
