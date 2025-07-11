import React from 'react'

const SpinnerLoading = () => {
  return (
    <div className='
      flex items-center justify-center 
      w-[200px] h-[180px] 
      rounded-2xl border border-gray-500
      bg-black/20 backdrop-blur-md
      shadow-lg
    '>
      <span
        className='
          inline-block
          w-10 h-10
          border-4 border-white/70 border-b-transparent
          rounded-full
          animate-spin
          box-border
        '
      ></span>
    </div>
  )
}

export default SpinnerLoading
