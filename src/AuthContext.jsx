import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
export function AuthProvider({children}) {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(()=> localStorage.getItem("token"))
  

  const navigate = useNavigate()



  useEffect(()=> {
    if(token) {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        setUser(storedUser)
      }

    }
  }, [token])

  //function wit parameters for login
  const login = (userData, jwtToken) => {
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", jwtToken)
    setToken(jwtToken)
    setUser(userData)
    setTimeout(() => {
      navigate("/dashboard")
    }, 50);
    
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    navigate("/")
  }
    

  return (
    <AuthContext.Provider value={{user, navigate, login, logout, token}}>
        {children}
    </AuthContext.Provider>
  )
}





export function UseAuth() {
  return (
    useContext(AuthContext)
  )
}

