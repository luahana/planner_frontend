import React, { useState } from 'react'

import { useAddCalendarMutation } from '../redux/slice/api/calendarApiSlice'

const Upload = () => {
  const [file, setFile] = useState()
  const fileReader = new FileReader()
  const [addCalendar, { isLoading, isSuccess, isError, error }] =
    useAddCalendarMutation()

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUploadClicked = async (e) => {
    e.preventDefault()
    console.log('file')
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result
        console.log(csvOutput)
      }

      fileReader.readAsText(file)
    }

    // await addCalendar()
  }
  return (
    <div>
      <h2>Upload csv file to add calendar date</h2>
      <form>
        <input type='file' accept='.csv' onChange={handleOnChange} />
        <button onClick={onUploadClicked}>upload</button>
      </form>
    </div>
  )
}

export default Upload
