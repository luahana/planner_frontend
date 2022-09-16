import React from 'react'

const ElementMaker = ({
  value,
  handleChange,
  handleBlur,
  handleDoubleClick,
  showContentInputEle,
}) => {
  return (
    <>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        showContentInputEle ? (
          <textarea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              padding: '1rem calc(5% + 1rem)',
              width: '100%',
              height: '10.5rem',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={handleDoubleClick}
            style={{
              padding: '1rem calc(5% + 1rem)',
              width: '100%',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {value}
          </div>
        )
      }
    </>
  )
}

export default ElementMaker
