import React from 'react'
import { UseAuth } from '../AuthContext'
import PrivateUpload from './PrivateUpload'
import PublicUpload from './PublicUpload'

function Upload() {
   const {user} = UseAuth()

  return (
    user ? <PrivateUpload/> : <PublicUpload/>
  )
}

export default Upload