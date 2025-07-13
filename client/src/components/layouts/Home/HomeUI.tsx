import Navbar from '@/components/Navbar/Navbar'
import { AuthUser } from '@/types/auth'
import React from 'react'

interface HomeUIProps {
  user: AuthUser
}

const HomeUI: React.FC<HomeUIProps> = ({ user }) => {
  return (
    <div className='w-full '>
      <Navbar user={user} />
      
    </div>
  )
}

export default HomeUI