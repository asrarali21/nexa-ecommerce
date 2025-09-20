

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from './pages/register'
import Products from './pages/Products'
import Electronics from './pages/Electronics'
import Fashion from './pages/Fashion'
import Sports from './pages/Sports'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'


function App() {
   
     
 
  return (

   <>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/electronics' element={<Electronics/>}/>
      <Route path="/singleProd/:id" element={<SingleProduct />} />
      <Route path='/fashion' element={<Fashion/>}/>
      <Route path='/sports' element={<Sports/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
   </>
  )
}

export default App
