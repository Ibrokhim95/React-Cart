

import React, { useEffect, useReducer } from 'react'
import { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import WishList from './pages/WishList'

export const productsContex = createContext()

const App = () => {

  const reducer = (state, action) => {
    if(action.type === "ALL_PRODUCTS") {
      return {...state, products: action.payload}
    }
    if(action.type === "ADD_CART") {
      return {...state, cart: [...state.cart, action.payload]}
    }
    if(action.type === "REMOVE_CART") {
      return {...state, cart: action.payload}
    }
    
    return state
  }

  const initialValue = {
    products: [],
    wish: [],
    cart: [],
  }

  const [state, dispatch] = useReducer(reducer, initialValue)

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch('https://dummyjson.com/products')
        const {products} = await resp.json()
        dispatch({type: "ALL_PRODUCTS", payload: products})
      } catch (error) {
        console.log(error);
      }
    } 
    getData()
  }, [])
  

  return (
    <productsContex.Provider value={[state, dispatch]}>

    <div>
      <Navbar/>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/wish-list' element={<WishList/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
    </productsContex.Provider>

  )
}

export default App