import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/login.module.css'
import { ROLES } from '../config/roles'
import { useRouter } from 'next/router'
import { useAddNewUserMutation } from '../redux/slice/api/usersApiSlice'

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PASSWORD_REGEX = /^[\S]{8,30}$/

const Signup = () => {
  const router = useRouter()
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()
  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState([ROLES.user])

  useEffect(() => {
    setValidName(USER_REGEX.test(name))
  }, [name])
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setEmail('')
      setPassword('')
      setRoles([])
      router.push('/')
    }
  }, [isSuccess])

  const onNameChanged = (e) => setName(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }

  const canSave =
    [validName, validPassword, roles.length].every(Boolean) && !isLoading

  const onSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ name, email, password, roles })
    }
  }

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ))

  const errClass = isError ? 'errmag' : 'offscreen'
  const validNameClass = !validName ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length)
    ? 'form__input--incomplete'
    : ''

  return (
    <div className={styles.container}>
      <h1>Sign up</h1>
      <p>{error?.data?.message}</p>
      <form onSubmit={onSubmit}>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='name'
          autoComplete='off'
          value={name}
          onChange={onNameChanged}
        />
        <input
          id='email'
          name='email'
          type='email'
          placeholder='email'
          autoComplete='off'
          value={email}
          onChange={onEmailChanged}
        />
        <input
          id='password'
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={onPasswordChanged}
        />
        <button disabled={!canSave}>SIGN UP</button>
        {/* <label htmlFor='roles'>ROLES</label>
        <select
          id='roles'
          name='roles'
          multiple={true}
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select> */}
      </form>
      <Link href='/login'>
        <a>Got an accout? Log in!</a>
      </Link>
    </div>
  )
}

export default Signup
