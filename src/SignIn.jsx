import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { UseAuth } from './AuthContext'


 function SignIn() {

    const {login} = UseAuth()
    const onSubmit = async (data) => {
        console.log(data)
        const response = await axios.post("https://summarai-backend.onrender.com/summarai/signIn", data)
        if(response.data.success) {
            login(response.data.user, response.data.token)
            console.log(response.data.token, "response.data.token")
            alert("Login Successfull")
        }
    }

    const schema = yup.object().shape({
        
        email: yup.string().email().required(),
        password: yup.string().min(4).max(20).required(),
        
    })

     const {register, handleSubmit, formState: {errors }} = useForm({
        resolver: yupResolver(schema)
     }) 

  return (
    <div className='flex items-center justify-center p-10'>
        <form className='w-1/3 bg-white py-10 px-5 shadow-md' onSubmit={handleSubmit(onSubmit)}>
             <div>
      <p className="text-2xl text-[#6C61EE] font-semibold text-center">SummarAI</p>
    </div>
    <div className='flex flex-col gap-2 text-sm'>
    {/* <p className='text-left text-xl'>Sign In</p> */}
    
    <label htmlFor="">
        Email
    </label>
    <input type="text" className='border-zinc-300' {...register("email")} />
    <label htmlFor="">Password</label>
    <input type="text" className='border-zinc-300' {...register("password")} />
   
    <input type='submit' className='rounded-md bg-[#61ee82] py-2 text-white hover:bg-[#5cc473]' value={"Sign In"}/>
    </div>
    <p className='text-xs mt-2'>Don't have an account? <Link to={"/signup"}><span className='text-blue-500 underline'>Sign Up</span></Link></p>
        </form>
    </div>
  )
}

export default SignIn