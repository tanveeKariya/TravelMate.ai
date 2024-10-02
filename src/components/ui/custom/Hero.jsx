import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Interinaries</h1>

        <p className='text-xl text-gray-500 text-center'>your personal trip planner is ready to provide you with a ease of tracking the whole trip within few seconds and tailored to your interest</p>
        
        <Link to={'/create-trip'}> 
          <Button className='cursor-pointer'> Get Started, It's Free</Button>
        </Link>

        <img src='landing.png' className=''/>
    </div>
  )
}

export default Hero