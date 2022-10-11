import { useState, useEffect } from 'react'
import Cookie from 'js-cookie'

const usePersist = (initialPersistValue: boolean) => {
  const [persist, setPersist] = useState<boolean>(() => {
    if (initialPersistValue) {
      return JSON.parse(initialPersistValue.toString())
    }
    return false
  })

  useEffect(() => {
    Cookie.set('persist', persist.toString())
  }, [persist])

  return [persist, setPersist] as const
}
export default usePersist
