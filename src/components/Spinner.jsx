import React from 'react'

function Spinner() {
  return (
    <div className='flex items-center justify-center'>
        <div className='w-8 h-8 rounded-full border-t-transparent animate-spin border-2 border-gray-700'>
        </div>
    </div>
  )
}

export default Spinner