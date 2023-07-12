

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='main-container py-4 grid grid-cols-2'>
        <div className="flex">
            <Link to={'/'} className='text-4xl font-semibold'><span className='text-red-500'>React</span>Cart</Link>
        
            <ul className='flex items-center gap-4 ml-[80px]'>
                <li>Home</li>
                <li>Shop</li>
                <li>Pages</li>
                <li>Contact</li>
            </ul>
        </div>

        <ul className='flex gap-4 items-center ml-auto'>
            <li className='font-bold text-[13px]'>Login/Register</li>
            <li className='font-bold text-[13px]'>Language</li>
            <li className='font-bold text-[13px]'>Currency</li>
        </ul>
    </div>
  )
}

export default Navbar