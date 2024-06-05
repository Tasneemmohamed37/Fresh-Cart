import React from 'react'
import notFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <>
      <img src={notFoundImg} alt="not found" className='mx-auto' />
    </>
  )
}
