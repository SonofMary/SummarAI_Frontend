import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { UseAuth } from './AuthContext'

function SignIn() {
    const { login } = UseAuth()
    
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post("https://summarai-backend.onrender.com/summarai/signIn", data)
            if(response.data.success) {
                login(response.data.user, response.data.token)
                console.log(response.data.token, "response.data.token")
                alert("Login Successful")
            }
        } catch (error) {
            console.error("Login error:", error)
            alert(error.response?.data?.message || "Login failed")
        }
    }

    const schema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required("Email is required"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    }) 

    return (
        <div className='flex items-center justify-center p-10'>
            <form className='w-full md:w-1/3 bg-white py-10 px-5 shadow-md rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p className="text-2xl text-[#6C61EE] font-semibold text-center">SummarAI</p>
                </div>
                <div className='flex flex-col gap-4 text-sm mt-6'>
                    <p className='text-left text-xl font-semibold'>Sign In</p>
                    
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input 
                            type="email" 
                            className='border border-zinc-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C61EE]' 
                            placeholder='Enter your email'
                            {...register("email")} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    
                    <input 
                        type='submit' 
                        className='rounded-md bg-[#6C61EE] py-3 text-white hover:bg-[#5a54e0] cursor-pointer mt-2 transition duration-200 font-medium' 
                        value={"Sign In with Email"}
                    />
                </div>
                <p className='text-xs mt-4 text-center text-gray-600'>
                    Don't have an account? 
                    <Link to={"/upgrade"}>
                        <span className='text-[#6C61EE] underline ml-1 font-medium'>Sign Up</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default SignIn