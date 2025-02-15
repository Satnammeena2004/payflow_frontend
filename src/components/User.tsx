


import React from 'react'
import { useUser } from '../services/queries'

const UserDetail = () => {
    const {data} = useUser()
  return (
    <div className="p-2 relative rounded-md bg-black/80 w-fit pr-10 dark:bg-rich_black-900 
    shadow-white inset-shadow-sm flex gap-x-2 items-center before:content-[''] before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:absolute before:bottom-3 before:left-10">
   <img className="w-10 h-10 rounded-full " src={data?.data?.user.profilePicture}/>
   <p className='text-white'>{data?.data?.user.name}</p>
    </div>
  )
}

export default UserDetail