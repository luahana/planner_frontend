import React from 'react'
import styled from 'styled-components'

const EditWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const TitleInput = styled.input`
  width: 100%;
  padding: 0 1.5rem;
  font-size: 1.2rem;
  border: 1px solid #7afcff;
`

const ContentTextarea = styled.textarea`
  width: 100%;
  whitespace: pre-wrap;
  padding: 0 1.5rem;
  height: 10.5rem;
  overflow: auto;
  font-size: 1.2rem;
  resize: none;
  border: 1px solid #7afcff;
`

const SaveDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #7afcff;
  z-index: 100;
  height: 3rem;
`

const EditView = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onClickSave,
}) => {
  return (
    <EditWrapper>
      <TitleInput type='text' value={title} onChange={onTitleChange} />
      <ContentTextarea value={content} onChange={onContentChange} />
      <SaveDiv onClick={onClickSave}>Save</SaveDiv>
    </EditWrapper>
  )
}

export default EditView
