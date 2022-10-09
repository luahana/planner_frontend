import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../redux/slice/authSlice'
import { useRefreshMutation } from '../redux/slice/api/authApiSlice'
import usePersist from './usePersist'
import ClipLoader from 'react-spinners/ClipLoader'

const PersistLogin = (initialPersistValue) => {
  const [persist] = usePersist(initialPersistValue)
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [
    refresh,
    { data, isUninitialized, isLoading, isSuccess, isError, error },
  ] = useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          data = await refresh()
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)
  }, [])

  const result = function (page) {
    return (
      <>
        {isLoading && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
          </div>
        )}
        {isError && <p>{page}</p>}
        {(!persist ||
          (isSuccess && trueSuccess) ||
          (token && isUninitialized)) && <>{page}</>}
      </>
    )
  }

  return result
}

export default PersistLogin
