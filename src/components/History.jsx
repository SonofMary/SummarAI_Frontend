import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UseAuth } from '../AuthContext'
import {
  AiFillFilePdf,
  AiFillFileWord,
  AiFillX,
  AiOutlineDelete,
  AiOutlineRedEnvelope,
} from "react-icons/ai";
import { Delete, DeleteOutline, DeleteOutlineOutlined } from '@mui/icons-material';


function History() {

  const {user , token, selectedFile, setSelectedFile} = UseAuth()
  const [summaryHistory, setSummaryHistory] = useState([])

useEffect(()=> {
  const fetchSummaries = async () => {
    const response = await axios.get(`http://localhost:3000/summarai/summary/${user._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response.data, "result from mongodb response.data")
    setSummaryHistory(response.data.data)

  }
  fetchSummaries()
}, [token])

  function getFileIcon(filename) {
    if (!filename) return null;
    if (filename.endsWith(".pdf"))
      return <AiFillFilePdf className="text-red-500 text-2xl" />;
    if (filename.endsWith(".docx"))
      return <AiFillFileWord className="text-blue-500 text-2xl" />;
    return null;
  }

  return (
    <div>
      <div className='px-20 flex flex-col gap-4' >
        <h2>Document History</h2>
        <p>View and manage your uploded documents </p>
        <div>{summaryHistory.map((summary)=> (
          <div className='p-2 border-2 bg-white rounded-lg mb-3'>
            <div className='flex gap-1'><span>{getFileIcon(summary.filename)}</span><p className='flex flex-col gap-2'>{summary.filename}<span>{summary.createdAt}</span></p><div className='ml-auto'><DeleteOutlineOutlined className='text-red-500'/></div></div>
            

          </div>
        ))}</div>
      </div>
    </div>
  )
}

export default History