import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'
import { UseAuth } from './AuthContext'

function SignUp() {
    const {navigate} = UseAuth()
   
    const onSubmit = async (data) => {

        const response = await axios.post("https://summarai-backend.onrender.com/summarai/signUp", data )
        console.log(data)
        const result = await response.data
        console.log(result)
        if (result.success) {
            navigate("/signin")
            alert("Sign Up complete")
        }
        
        
    }

    const schema = yup.object().shape({
        fullName: yup.string().required("Please input your full name"),
        email: yup.string().email().required(),
        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords do not match").required("Confirm password is a requird field") 
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
    {/* <p className='text-left text-xl'>Sign Up</p> */}
    <label htmlFor="">
        Full Name
    </label>
    <input type="text" className={`border-zinc-300 ${errors.fullName && `border-red-400`}`} {...register("fullName")} />
    {errors.fullName && (<small>{errors.fullName.message}</small>)}
    <label htmlFor="">
        Email
    </label>
    <input type="text" className={`border-zinc-300 ${errors.email && `border-red-400`}`}  {...register("email")}/>
    {errors.email && (<small>{errors.email.message}</small>)}
    <label htmlFor="">Password</label>
    <input type="text" className={`border-zinc-300 ${errors.password && `border-red-400`}`} {...register("password")} />
    {errors.password && (<small>{errors.password.message}</small>)}
    <label htmlFor="">Confirm Password</label>
    <input type="text"className={`border-zinc-300 ${errors.confirmPassword && `border-red-400`}`}  {...register("confirmPassword")} />
    {errors.confirmPassword && (<small>{errors.confirmPassword.message}</small>)}
    <input type='submit' className='rounded-md bg-[#6C61EE] py-2 text-white hover:bg-[#7f74f4]' value={"Sign Up"}/>
    </div>
    <p className='text-xs mt-2'>Already have an account? <Link to={"/signin"}><span className='text-blue-500 underline'>Sign In</span></Link></p>
        </form>
    </div>
  )
}

export default SignUp