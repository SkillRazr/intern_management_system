import React, { useEffect, useState } from 'react'
import InternDetails from './InternDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getInterns } from '../apiHelper';


export default function Attendance() {

    const [internsList, setInternsList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearchSubmit() {
      e.preventDefault()
      
    }

    useEffect(() => {
        const loadInterns = async () => {
          const response = await getInterns();
          
          if (response.status === 1) {
            setInternsList(response.data);
          }
        }
       
        loadInterns();
      }, []);

  return (
    <>
    <form className='flex items-center' onSubmit={handleSearchSubmit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-4'/>
        <input type='text' name='search' value={searchQuery} className='p-2 outline-none w-full' placeholder='Seach intern...' onChange={(e) => {setSearchQuery(e.target.value)}}/>
    </form>
    {
      internsList.length !== 0 &&
      internsList.map((intern) => (
        < InternDetails intern={intern} key={intern.id} />
      ))
    }
    </>
  )
}
