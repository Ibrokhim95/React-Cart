

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-[80%] xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[600px] mx-auto py-4 grid grid-cols-2'>
      <ul className='flex items-center gap-2 text-xs sm:text-sm'>
        <li>Home</li>
        <li>Shop</li>
        <li>Pages</li>
        <li>Contact</li>
      </ul>

      <ul className='flex gap-2 items-center ml-auto text-[10px] sm:text-sm'>
        <li className='font-bold'>Login/Register</li>
        <li className='font-bold'>Language</li>
        <li className='font-bold'>Currency</li>
      </ul>
    </div>
  )
}

export default Navbar