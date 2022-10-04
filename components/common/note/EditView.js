import React from 'react'
import styled from 'styled-components'
import PulseLoader from 'react-spinners/PulseLoader'

const EditWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
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
  height: 3rem;
`
const SaveDivWrapper = styled.div`
  position: relative;
`

const LoaderWrapper = styled.div`
  position: absolute;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const EditView = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onClickSave,
  loading,
}) => {
  return (
    <EditWrapper>
      <TitleInput type='text' value={title} onChange={onTitleChange} />
      <ContentTextarea value={content} onChange={onContentChange} />
      <SaveDivWrapper>
        {loading && (
          <LoaderWrapper>
            <PulseLoader
              color='#ff7eb9'
              loading={loading}
              size='2rem'
              aria-label='Loading Spinner'
            />
          </LoaderWrapper>
        )}

        <SaveDiv onClick={onClickSave}>Save</SaveDiv>
      </SaveDivWrapper>
    </EditWrapper>
  )
}

export default EditView
