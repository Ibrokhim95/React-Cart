


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductsContex } from '../App'

const Header = () => {

    const [state, dispatch] = useContext(ProductsContex)
    const menuN = document.getElementById("menu")

    let LS = JSON.parse(localStorage.getItem('cart')) ?? []
    let LSW = JSON.parse(localStorage.getItem('wish')) ?? []

    const handleSearch = (e) => {
        e.preventDefault()
        if(state.value.length > 0) {
            const searchData = state.products.filter(item => item.title.toLowerCase().includes(state.value))
            dispatch({type: "PRODUCTS", payload: searchData})
        } else {
            dispatch({type: "PRODUCTS", payload: state.AllProducts})
        }
    }

    const menu = () => {
        if(menuN.classList.contains("-right-[150px]")) {
            menuN.classList.remove("-right-[150px]")
            menuN.classList.add("right-0")
        } else {
            menuN.classList.remove("right-0")
            menuN.classList.add("-right-[150px]")
        }
    }

  return (
    <div className='bg-red-500 relative'>
        <div className="overflow-hidden w-[80%] xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[600px] mx-auto py-3 flex flex-wrap justify-between">
            <div className="hidden md:block relative bg-black text-white p-3 px-7 rounded-lg">
                <div className='flex gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <p className='inlline-block'>All catecories</p>
                </div>
            </div>

            <form action="" className='flex lg:mx-auto'>
                <label htmlFor="" className='w-[300px] sm:w-[300px] xl:w-[500px]'>
                    <input onChange={(e) => dispatch({type: "VALUE", payload: e.target.value})} value={state.value} className='w-[100%] h-[50px] rounded-l-lg focus:border-none outline-none' type="text" name="" id="" placeholder='Search product...'/>
                </label>
                <button onClick={(e) => handleSearch(e)} className='bg-black text-white px-7 rounded-r-lg'>Search</button>
            </form>

            <svg id='bars' onClick={() => menu()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 lg:hidden">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>


            <div id='menu' className='transition-all ml-auto text-white text-center bg-red-500 w-[150px] z-10 top-[102%] -right-[150px] p-4 rounded lg:w-[250px] lg:p-0 lg:flex justify-between items-center gap-3'>
                <Link to={"/wish-list"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    
                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute right-2 -top-1'>{LSW.length}</p>

                    <p>Wish list</p>
                </Link>

                <Link to={"/cart"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto mt-3 lg:mt-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute -right-2 -top-1'>{LS.length}</p>

                    <p className='mb-3 lg:mb-0'>Cart</p>
                </Link>

                <Link className=''>
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