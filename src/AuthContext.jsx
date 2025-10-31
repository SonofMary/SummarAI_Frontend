import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()
export function AuthProvider({children}) {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(()=> localStorage.getItem("token"))
  const [userDetail, setUserDetail] = useState(null)
  const [summaryHistory, setSummaryHistory] = useState([])
  const navigate = useNavigate()



  useEffect(()=> {
    if(token) {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        setUser(storedUser)
      }
       const fetchSummaries = async () => {
    const response = await axios.get(`https://summarai-backend.onrender.com/summarai/summary/${user._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response.data, "result from mongodb response.data")
    setSummaryHistory(response.data.data)

  };
   async function getUserDetail() {
      const response = await axios.get(`https://summarai-backend.onrender.com/summarai/user/${user._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response.data, "result from mongodb response.data")
    setUserDetail(response.data.data)
    }
     getUserDetail()
     fetchSummaries()

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
    <AuthContext.Provider value={{user, navigate, login, logout, token, setSummaryHistory, summaryHistory, setUserDetail, userDetail}}>
        {children}
    </AuthContext.Provider>
  )
}





export function UseAuth() {
  return (
    useContext(AuthContext)
  )
}

