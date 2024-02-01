import React from 'react'

function Error({Icon , message}) {
  return (
    <div className='flex justify-center items-center h-full'>
            <div> <div className='flex justify-center'>
            <Icon color='white' className='text-9xl'  />
            </div>
            <p className='text-white text-center font-semibold'>{message}</p>
            </div>
        </div>
  )
}

export default Error