import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Homepage'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { NavbarMenu } from './Navbar'
import Hero from './Hero'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Upload from './components/Upload'
import { AuthProvider } from './AuthContext'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import ProtectedRoute from './ProtectedRoute'
import PublicUpload from './components/PublicUpload'


export default function App() {
  return (
    <>
   
    <Router>
       <AuthProvider>
      <NavbarMenu/>
      <Routes>
      <Route path='/' element={<Hero/>} />
      <Route path='/upload' element={<PublicUpload/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/dashboard/*' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

      </Routes>
      </AuthProvider>
    </Router>
   
    
    </>
  );
}





// export function Component() {
//   return (
    
//   );
// }


