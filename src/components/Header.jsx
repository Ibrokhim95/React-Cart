


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductsContex } from '../App'

const Header = () => {

    const [state, dispatch] = useContext(ProductsContex)

    let LS = JSON.parse(localStorage.getItem('cart')) ?? []
    let LSW = JSON.parse(localStorage.getItem('wish')) ?? []

    const handleSearch = (e) => {
        e.preventDefault()
        if (state.value.length > 0) {
            const searchData = state.products.filter(item => item.title.toLowerCase().includes(state.value.toLowerCase()))
            dispatch({ type: "PRODUCTS", payload: searchData })
        } else {
            dispatch({ type: "PRODUCTS", payload: state.AllProducts })
        }
    }

    return (
        <div className='bg-red-500 sticky top-0 w-[100%] z-10'>
            <div className="w-[80%] xl:w-[1200px] lg:w-[1000px] md:w-[730px] sm:w-[600px] mx-auto py-3 flex justify-between items-center gap-5">
                <Link to={'/'} className='hidden md:block bg-white w-max rounded p-1 text-4xl font-semibold'><span className='text-red-500'>React</span>Cart</Link>

                <form className='border text-xs flex rounded-lg overflow-hidden w-[100%] md:max-w-[50%]' onSubmit={(e) => handleSearch(e)}>
                    <label className='w-[80%] md:w-[75%]'>
                        <input className='py-3 w-full' onChange={(e) => dispatch({ type: "VALUE", payload: e.target.value })} value={state.value} type="text" name="" id="" placeholder='Search...' />
                    </label>

                    <button className='bg-black text-white px-4 w-[20%] md:w-[25%]'>Search</button>
                </form>

                <div className='hidden text-xs lg:text-base md:flex items-center gap-3 text-white min-w-[138px] lg:gap-5 lg:min-w-[188px]'>
                    <Link to={"/wish-list"} className='relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute right-2 -top-1 lg:text-xs'>{LSW.length}</p>

                        <p>Wish list</p>
                    </Link>

                    <Link to={"/cart"} className='relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute -right-1 -top-1 lg:text-xs'>{LS.length}</p>

                        <p>Cart</p>
                    </Link>

                    <Link className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>

                        <p>Account</p>
                    </Link>
                </div>
            </div>

            <div className='bg-red-500 z-10 fixed bottom-0 right-0 w-[100%] text-white text-xs flex justify-between items-center px-4 md:hidden'>
                <Link to={"/"} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    <p>Home</p>
                </Link>

                <Link className='text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>

                    <p className='text-center'>Caategories</p>
                </Link>

                <Link to={"/wish-list"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>

                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute right-0 -top-1'>{LSW.length}</p>

                    <p>Wish list</p>
                </Link>

                <Link to={"/cart"} className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto mt-3 lg:mt-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <p className='bg-black text-[12px] w-4 h-4 text-center rounded-full absolute -right-2 top-2'>{LS.length}</p>

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
    )
}

export default Header