
import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductsContex } from '../App'
import "../axios/global-instances"

export const cartList = (item, state, dispatch) => {
    let LS = JSON.parse(localStorage.getItem('cart')) ?? []
    const removeItem = LS.find(listItem => listItem.id === item.id)

    if (!removeItem) {
        dispatch({ type: "ADD_CART", payload: item })
        LS.push(item)
    } else {
        LS = LS.filter(el => el.id !== item.id)
        dispatch({ type: "REMOVE_CART", payload: LS })
    }

    localStorage.setItem("cart", JSON.stringify(LS))
}

export const wishList = (item, state, dispatch) => {
    let LS = JSON.parse(localStorage.getItem('wish')) ?? []
    const removeItem = LS.find(listItem => listItem.id === item.id)

    if (!removeItem) {
        dispatch({ type: "ADD_WISH", payload: item })
        LS.push(item)
    } else {
        LS = LS.filter(el => el.id !== item.id)
        dispatch({ type: "REMOVE_WISH", payload: LS })
    }

    localStorage.setItem("wish", JSON.stringify(LS))
}

const Home = () => {

    const [state, dispatch] = useContext(ProductsContex)

    const cols = document.getElementById("cols")
    const col = document.getElementById("col")

    const sort = async (e) => {
            if(e === "all") {
                try {
                    const {data: {products}} = await axios.get("/products")
                    dispatch({type: "PRODUCTS", payload: products})
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const {data: {products}} = await axios.get(`products/category/${e}`)
                    dispatch({type: "PRODUCTS", payload: products})
                } catch (error) {
                    console.log(error);
                }
            }
    }

    const display = (par) => {
        if(par === "col") {
            col.classList.remove("hidden")
            col.classList.add("grid")
            cols.classList.add("hidden")
            console.log("col");

        } else {
            cols.classList.remove("hidden")
            col.classList.add("hidden")
            console.log("cols");
        }
    }

    const itemInfo = (item) => {
        const obj = {
           title: item.title,
           brand: item.brand,
           category: item.category,
           image: item.thumbnail,
           description: item.description,
           price: item.price,
           discountPercentage: item.discountPercentage,
        }
        dispatch({type: "ITEM", payload: obj})
    }


    return (
        <div className='w-[80%] xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[600px] mx-auto pb-20'>
            <div className='flex justify-between items-center'>
                <select onChange={(e) => sort(e.target.value)} name="" id="" className='outline-none rounded my-4'>
                    <option value="all">all</option>
                    <option value="smartphones">smartphones</option>
                    <option value="laptops">laptops</option>
                    <option value="fragrances">fragrances</option>
                    <option value="skincare">skincare</option>
                    <option value="groceries">groceries</option>
                    <option value="home-decoration">home-decoration</option>
                </select>

                <div className='flex gap-2'>
                    <svg onClick={() => display("col")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 boreder border-gray-500 border-2 text-gray-500 rounded p-1 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>

                    <svg onClick={() => display("cols")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 boreder border-gray-500 border-2 text-gray-500 rounded p-1 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                </div>
            </div>

            <div id='cols' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
                {state.products.map(item => (
                    <div key={item.id} className='shadow rounded-md overflow-hidden hover:shadow-lg'>
                        <div className='h-[260px] w-[100%] relative'>
                            <img className='w-[100%] h-[100%] object-cover' src={item.thumbnail} alt="" />

                            <div className='absolute inset-0 bg-white/50 opacity-0 hover:opacity-100 transition-all flex items-center justify-center gap-2'>
                                <svg onClick={() => cartList(item, state, dispatch)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 bg-red-500 rounded-full p-2 text-white hover:bg-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                <svg onClick={() => wishList(item, state, dispatch)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 bg-red-500 rounded-full p-2 text-white hover:bg-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                        </div>

                        <div className='p-4 flex flex-col gap-2'>
                            <h2 className='font-bold text-lg'>{item.title}</h2>

                            <p><span className='line-through text-red-500 font-semibold'>${item.price}</span><span className='text-gray-400 text-xs'>(-{item.discountPercentage}%)</span><span className='text-green-500 ml-3 font-semibold'>${`${item.price - (item.price / (100 / item.discountPercentage))}`}</span></p>

                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${item.rating > 4.5 ? "fill-yellow-400" : "fill-gray-300"}`}>
                                    <path className={`${item.rating > 4.5 ? "text-yellow-400" : "text-gray-300"}`} strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>

                                <span className='text-gray-400 ml-3'>({item.rating})</span>
                            </div>

                            <Link to={"/about"} onClick={() => itemInfo(item)} className="text-center text-white bg-red-500 rounded">More</Link>
                        </div>
                    </div>
                ))}
            </div>

            <div id='col' className='hidden grid grid-cols-1 gap-8'>
                {state.products.map(item => (
                    <div key={item.id} className="flex my-2 shadow rounded-lg overflow-hidden w-[60%]">
                        <div className='w-[25%]'>
                            <img className='h-[100%]' src={item.thumbnail} alt="" />
                        </div>

                        <div className='p-4 flex flex-col gap-2'>
                            <h2 className='font-bold text-lg'>{item.title}</h2>

                            <p><span className='line-through text-red-500 font-semibold'>${item.price}</span><span className='text-gray-400 text-xs'>(-{item.discountPercentage}%)</span><span className='text-green-500 ml-3 font-semibold'>${`${item.price - (item.price / (100 / item.discountPercentage))}`}</span></p>

                            <p>{item.description}</p>
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-yellow-400">
                                    <path className='text-yellow-400' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${item.rating > 4.5 ? "fill-yellow-400" : "fill-gray-300"}`}>
                                    <path className={`${item.rating > 4.5 ? "text-yellow-400" : "text-gray-300"}`} strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>

                                <span className='text-gray-400 ml-3'>({item.rating})</span>
                            </div>

                            <div className='flex gap-4' onClick={() => cartList(item, state, dispatch)}>
                                <div className='text-xs border border-1 outline outline-2 outline-red-500 w-[160px] bg-red-500 text-white p-4 rounded flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    Add to cart
                                </div>

                                <div onClick={() => wishList(item, state, dispatch)} className='text-xs border border-1 outline outline-2 outline-red-500 w-[160px] bg-red-500 text-white p-4 rounded flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    Add to wishlist
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home