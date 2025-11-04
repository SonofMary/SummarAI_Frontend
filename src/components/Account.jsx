import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UseAuth } from '../AuthContext'
import { AiOutlineProfile, AiOutlineTrophy, AiTwotoneProfile } from 'react-icons/ai'
import { CalendarTodayOutlined, ChatBubble, ChatBubbleOutline, EmailOutlined, Person2Outlined, QuizOutlined } from '@mui/icons-material'
import moment from 'moment'
import { GrDocument, GrDocumentNotes, GrDocumentPdf } from 'react-icons/gr'

function Account() {
const {user, token, userDetail, setUserDetail, summaryHistory, userQuizDetails, setUserQuizDetails  } = UseAuth()

// const [userDetail, setUserDetail] = useState(null)
  
//   useEffect(()=> {
//    async function getUserDetail() {
//       const response = await axios.get(`https://summarai-backend.onrender.com/summarai/user/${user._id}`, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
//     console.log(response.data, "result from mongodb response.data")
//     setUserDetail(response.data.data)
//     }
//     getUserDetail()
//   }, [token])

const averagePercentage = userQuizDetails.reduce((sum, quiz) => sum + quiz.score, 0)/ userQuizDetails.reduce((sum, quiz) => sum + quiz.totalQuestions, 0) * 100
  return (
    
    <div>{userDetail && (
      <>
      <div className='px-10 border-2 rounded-lg p-6 mb-3 flex flex-col gap-1'>
        <h2>Profile</h2>
        <p>Your Personal Details</p>
      <div className='flex flex-col gap-3 mt-2 '>
        <div className='flex gap-3 '>
          <p className='text-white bg-slate-400 w-20 h-20 rounded-full flex items-center justify-center'>{userDetail.email.charAt(0).toUpperCase()}</p>
          <div className='flex flex-col gap-3'>
            <p className='flex gap-1'><Person2Outlined className='scale-75'/>{userDetail.fullName || userDetail.email.split("@")[0]}</p>
            <p className='flex gap-1'><EmailOutlined className='scale-75'/>{userDetail.email}</p>
            <p className='flex gap-1'><CalendarTodayOutlined className='scale-75'/>Member since {moment(userDetail.createdAt).fromNow()}</p>
          </div>

        </div>
         <button className='bg-red-500 text-white w-fit p-2 rounded-md text-sm'>Log Out</button>
       
      </div>
      </div>

       <div className='px-10 border-2 rounded-lg p-6'>
        <h2>Your Statistics</h2>
        <p>Overwiew of your activity on SummarAI</p>
      <div className='flex flex-col gap-3  rounded-lg p-6'>
        
         
          <div className='grid sm:grid-cols-2 gap-3'>
            <div className='flex gap-4'>{<p className='flex items-center justify-center p-3 rounded-md text-2xl bg-slate-300'><GrDocument /></p>}<p className='flex flex-col gap-1' ><span>Document Processed</span><span>{summaryHistory.length}</span></p></div>
           <div className='flex gap-4'>{<p className='flex items-center justify-center p-3 rounded-md text-2xl bg-slate-300'><QuizOutlined /></p>}<p className='flex flex-col gap-1' ><span>Quizzes taken</span><span>{userQuizDetails.length}</span></p></div>
           {/* <div className='flex gap-4'>{<p className='flex items-center justify-center p-3 rounded-md text-2xl bg-slate-300'><ChatBubbleOutline /></p>}<p className='flex flex-col gap-1' ><span>Chat Messages</span><span>{summaryHistory.length}</span></p></div> */}
           <div className='flex gap-4'>{<p className='flex items-center justify-center p-3 rounded-md text-2xl bg-slate-300'><AiOutlineTrophy /></p>}<p className='flex flex-col gap-1' ><span>Average Quiz Score</span><span>{averagePercentage}%</span></p></div>
          </div>

        
       
       
      </div>
      </div>
      </>
    )}
      
    </div>
  )
}

export default Account