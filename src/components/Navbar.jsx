

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-[100%] xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[600px] mx-auto py-4 grid grid-cols-2'>
      <ul className='flex items-center gap-4'>
        <li>Home</li>
        <li>Shop</li>
        <li>Pages</li>
        <li>Contact</li>
      </ul>

      <ul className='flex gap-4 items-center ml-auto'>
        <li className='font-bold text-[13px]'>Login/Register</li>
        <li className='font-bold text-[13px]'>Language</li>
        <li className='font-bold text-[13px]'>Currency</li>
      </ul>
    </div>
  )
}

export default Navbar