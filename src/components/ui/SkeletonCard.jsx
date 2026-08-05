import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='w-60 bg-zinc-800 rounded-xl overflow-hidden animate-pulse'>
        <div className='h-48 w-full bg-zinc-700 rounded'>
        </div>
        <div className='p-4 flex flex-col gap-2'>
            <div className='h-3 w-16 bg-zinc-400 opacity-50'></div>
            <div className='h-4 w-36 bg-zinc-400 opacity-50'></div> 
            <div className='h-4 w-20 bg-zinc-400 opacity-50'></div>
            <div className='h-9 w-full bg-zinc-700 rounded'></div>
        </div>
    </div>
  )
}

export default SkeletonCard
