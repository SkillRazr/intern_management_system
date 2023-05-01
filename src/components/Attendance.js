import React, { useEffect, useState } from 'react'
import InternDetails from './InternDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getInterns } from '../apiHelper';


export default function Attendance() {

    const [internsList, setInternsList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false)

    useEffect(() => {
      const filteredList = internsList.filter((intern) => intern.data.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchList(filteredList)
    }, [searchQuery]);

    useEffect(() => {
        const loadInterns = async () => {
          const response = await getInterns();
          
          if (response.status === 1) {
            setInternsList(response.data);
          }
        }
       
        loadInterns();
      }, []);
      

      const renderInternsList = () => {
        const list = searchList.length === 0 ? internsList : searchList
        return list.map((intern) => (
            < InternDetails key={intern.id} intern={intern} selectAllCheckbox={selectAllCheckbox} />
        ))
    }

  return (
    <>
    <form className='flex items-center'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-4'/>
        <input type='text' name='search' value={searchQuery} className='p-2 outline-none w-full' placeholder='Enter intern name...' onChange={(e) => {setSearchQuery(e.target.value)}}/>
    </form>
    <form className='flex justify-between'> 
      <label htmlFor='selectAll' className='flex ml-4 items-center'>
        <p className='mr-2'>Select all</p>
        <input type='checkbox' id='selectAll' onChange={(e) => {setSelectAllCheckbox(e.target.checked)}}/>
      </label>
      <button type='submit' className='cursor-pointer bg-black text-white rounded m-1 px-2'>Mark attendance</button>
    </form>
    <div className='interns-list-container flex flex-col items-center bg-black h-screen'>
    {
      internsList.length !== 0 && renderInternsList()
    }
    </div>
    </>
  )
}
