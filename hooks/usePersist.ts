import { useState, useEffect } from 'react'
import Cookie from 'js-cookie'

const usePersist = (initialPersistValue: string) => {
  const [persist, setPersist] = useState(() => {
    if (initialPersistValue) {
      return JSON.parse(initialPersistValue)
    }
    return false
  })

  useEffect(() => {
    Cookie.set('persist', persist)
  }, [persist])

  return [persist, setPersist] as const
}
export default usePersist
