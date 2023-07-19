


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductsContex } from '../App'

const Header = () => {

    const [state, dispatch] = useContext(ProductsContex)

    let LS = JSON.parse(localStorage.getItem('cart')) ?? []
    let LSW = JSON.parse(localStorage.getItem('wish')) ?? []

    const handleSearch = (e) => {
        e.preventDefault()
        if(state.value.length > 0) {
            const searchData = state.products.filter(item => item.title.toLowerCase().includes(state.value))
            dispatch({type: "PRODUCTS", payload: searchData})
        } else {
            dispatch({type: "PRODUCTS", payload: state.allProducts})
        }
    }

  return (
    <div className='bg-red-500'>
        <div className="main-container py-3 flex">
            <div className="relative bg-black text-white p-3 px-7 rounded-lg">
                <div className='flex gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <p className='inlline-block'>All catecories</p>
                </div>
            </div>

            <form action="" className='flex w-[60%] ml-auto'>
                <label htmlFor="" className='w-[60%]'>
                    <input onChange={(e) => dispatch({type: "VALUE", payload: e.target.value})} value={state.value} className='w-[100%] h-[50px] rounded-l-lg focus:border-none outline-none' type="text" name="" id="" placeholder='Search product...'/>
                </label>
                <button onClick={(e) => handleSearch(e)} className='bg-black text-white px-7 rounded-r-lg'>Search</button>
            </form>

            <div className='text-white flex items-center gap-7'>
                <Link to={"/wish-list"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    
                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute right-2 top-0'>{LSW.length}</p>

                    <p>Wish list</p>
                </Link>

                <Link to={"/cart"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute right-0 top-0'>{LS.length}</p>

                    <p>Cart</p>
                </Link>

                <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    <p>Account</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header