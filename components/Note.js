import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
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

const Note = ({
  noteId,
  userId,
  noteTitle,
  noteContent,
  noteCompleted,
  noteSets,
  noteAssignedDate,
  isFetching,
}) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation()

  const [showInputEle, setShowInputEle] = useState(false)
  const [showContentInputEle, setShowContentInputEle] = useState(false)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [completed, setCompleted] = useState(noteCompleted)
  const [sets, setSets] = useState(noteSets)

  useEffect(() => {
    if (!showInputEle && !showContentInputEle) {
      setTitle(noteTitle)
      setContent(noteContent)
      setCompleted(noteCompleted)
    }
  }, [isError, isDelError, isFetching])

  const handleBlur = async () => {
    if (noteTitle !== title) {
      await updateNote({
        _id: noteId,
        user: userId,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
        sets,
      })
    }
    setShowInputEle(false)
  }
  const handleBlurContent = async () => {
    if (noteContent !== content) {
      await updateNote({
        _id: noteId,
        user: userId,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
        sets,
      })
    }
    setShowContentInputEle(false)
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
      user: userId,
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
      user: userId,
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
      <TitleDiv>
        <CompletedDiv onClick={handleCompletedOnClick}>
          {noteCompleted ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </CompletedDiv>

        <ElementMaker
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
          handleDoubleClick={() => setShowInputEle(true)}
          handleBlur={handleBlur}
          showInputEle={showInputEle}
        />
        <DeleteDiv onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteDiv>
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
      <div>
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
      </div>
    </Wrapper>
  )
}

export default Note
