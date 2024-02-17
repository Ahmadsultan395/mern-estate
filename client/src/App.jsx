import React from 'react'
import {Route,Routes} from "react-router-dom"
import {BrowserRouter as Router} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import Header from './components/Header'
import PrivateRouter from './components/privateRouter'

function App() {
  return (
   <Router>
<Header/>
   <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/about'  element={<About/>}/>
    <Route   element={<PrivateRouter />}>
    <Route path='/profile'  element={<Profile/>}/>
    </Route>
    <Route path='/signin'  element={<SignIn/>}/>
    <Route path='/signup'  element={<SignOut/>}/>
   </Routes>
   </Router>
  )
}

export default App