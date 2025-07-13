import DashboardCard from '@/components/DashboardCard/DashboardCard'
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
      
      <section className='w-full flex items-center justify-center pt-3'>
        <DashboardCard user={user}/>
      </section>
      <section className='w-full flex items-center justify-center pt-3'>
        
      </section>
    </div>
  )
}

export default HomeUI