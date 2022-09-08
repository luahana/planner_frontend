import React from 'react'
import Link from 'next/link'

const navbar = () => {
  return (
    <nav className='nav'>
      <Link href='/'>
        <a>logo</a>
      </Link>
      <ul className='nav-menu'>
        <li>home</li>
        <li>about</li>
      </ul>
      <Link href='/login'>
        <a>log in</a>
      </Link>
    </nav>
  )
}

export default navbar
