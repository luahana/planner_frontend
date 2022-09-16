import React, { memo } from 'react'

const ElementMaker = ({
  type,
  value,
  handleChange,
  handleBlur,
  handleDoubleClick,
  showInputEle,
}) => {
  return (
    <>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        showInputEle ? (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            maxlength='50'
            style={{
              padding: '1rem',
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            style={{
              padding: '1rem',
              display: 'inline-block',
              width: '100%',
              overflow: 'auto',
            }}
          >
            {value}
          </span>
        )
      }
    </>
  )
}

export default memo(ElementMaker)
