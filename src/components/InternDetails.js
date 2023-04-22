import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function InternDetails({ intern }) {

    const internPresent = () => {
        //update attendance
    }

    const internAbsent = () => {
        //update attendance
    }

  return (
    <div className='interns-list-container flex flex-col items-center bg-black h-screen'>
        <div className='intern-container w-[98%] flex justify-between border border-black rounded p-1.5 mt-1 mx-1 bg-white'>
            <div className='intern-details-container w-9/12 items-center'>
                <p className='ml-8 text-xl font-medium'>{intern.data.name}</p>
                <p className='ml-8 text-xs text-zinc-400'>{new Date(intern.data.joinedOn?.toDate()).toLocaleDateString(navigator.language, {day: 'numeric', month: 'short', year: 'numeric'})}</p>
            </div>
            <div className='icon-container w-3/12 flex justify-evenly items-center'>
                <FontAwesomeIcon icon={faCircleCheck} className='cursor-pointer text-2xl' onClick={internPresent}/>
                <FontAwesomeIcon icon={faCircleXmark} className='cursor-pointer text-2xl' onClick={internAbsent}/>
            </div>
        </div>
    </div>
  )
}
