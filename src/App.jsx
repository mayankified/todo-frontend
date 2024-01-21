import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import './Styles/App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
    </BrowserRouter>  
  )
}

export default App