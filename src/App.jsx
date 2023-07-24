

import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import WishList from './pages/WishList'
import "./axios/global-instances"

export const ProductsContex = createContext()

const App = () => {

  const reducer = (state, action) => {
    if(action.type === "ALL_PRODUCTS") {
      return {...state, AllProducts: action.payload}
    }    if(action.type === "PRODUCTS") {
      return {...state, products: action.payload}
    }
    if(action.type === "VALUE") {
      return {...state, value: action.payload}
    }
    if(action.type === "ADD_CART") {
      return {...state, cart: [...state.cart, action.payload]}
    }
    if(action.type === "REMOVE_CART") {
      return {...state, cart: action.payload}
    }
    if(action.type === "ADD_WISH") {
      return {...state, wish: [...state.wish, action.payload]}
    }
    if(action.type === "REMOVE_WISH") {
      return {...state, wish: action.payload}
    }
    if(action.type === "ITEM") {
      return {...state, item: action.payload}
    }
    return state
  }

  
  const initialValue = {
    AllProducts: [],
    products: [],
    value: "",
    wish: [],
    cart: [],
    item: {},
  }
  
  const [state, dispatch] = useReducer(reducer, initialValue)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const {data: {products}} = await axios.get("/products") 
        dispatch({type: "PRODUCTS", payload: products})
        dispatch({type: "ALL_PRODUCTS", payload: products})
      } catch (error) {
        console.log(error);
      }
    } 
    getData()
  }, [])
  

  return (
    <ProductsContex.Provider value={[state, dispatch]}>

    <div>
      <Navbar/>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/wish-list' element={<WishList/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
    </ProductsContex.Provider>

  )
}

export default App