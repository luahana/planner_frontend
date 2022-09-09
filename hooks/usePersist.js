import { useState, useEffect } from 'react'
import Cookie from 'js-cookie'

const usePersist = () => {
  const [persist, setPersist] = useState(false)

  useEffect(() => {
    Cookiie.set('persist', persist)
  }, [persist])

  // useEffect(() => {
  //   setPersist(JSON.parse(localStorage.getItem('persist')))

  //   localStorage.setItem('persist', JSON.stringify(persist))
  // }, [persist])

  return [persist, setPersist]
}
export default usePersist
