import React from 'react'
import { useNavigate } from 'react-router-dom'

const BreadCrums = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className='max-w-6xl mx-auto my-10 '>
      <h1 className='text-xl text-gray-600 font-bold'>
        <span className='cursor-pointer' onClick={()=>{navigate('/')}}>/home/</span>
      <span className='cursor-pointer'  onClick={()=>{navigate('/products')}}>product/</span>
      <span className='cursor-pointer'>{title}</span>
      </h1>
    </div>
  )
}

export default BreadCrums
