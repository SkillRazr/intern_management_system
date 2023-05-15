import React, { useEffect, useState } from 'react'
import InternDetails from './InternDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getInterns, updateAttendance } from '../apiHelper';
import { db1 } from '../firebase'
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import Popup from './Popup';


export default function Attendance() {

    const [internsList, setInternsList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false)
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
      setCheckboxValues(internsList.map(() => false));
    }, [internsList]);

    useEffect(() => {
      setCheckboxValues(internsList.map(() => selectAllCheckbox));
    }, [selectAllCheckbox]);

    const handleCheckboxChange = (index, isChecked) => {
      if (isChecked === true || isChecked === false) {
        const newValues = [...checkboxValues];
        newValues[index] = isChecked;
        setCheckboxValues(newValues);  
      }
    };

    useEffect(() => {
      const filteredList = internsList.filter((intern) => intern.name.toLowerCase().includes(searchQuery.toLowerCase()))
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

      async function handleUpdateAttendance(e) {
        e.preventDefault()
        try {
          const response = await updateAttendance({checkboxValues})
          if (response.status === 1) {
            setShowPopup(true)
            setSelectAllCheckbox(false)
          }
        } catch (error) {
          console.log(error.message);
        }
        
      }

      const renderInternsList = () => {
        const list = searchList.length === 0 ? internsList : searchList
        return list.map((intern, index) => (
            < InternDetails intern={intern} handleCheckboxChange={handleCheckboxChange} index={index} selectAllCheckbox={selectAllCheckbox} />
        ))
    }

  return (
    <>
    <form className='flex items-center'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-4'/>
        <input type='text' name='search' value={searchQuery} className='p-2 outline-none w-full' placeholder='Enter intern name...' onChange={(e) => {setSearchQuery(e.target.value)}}/>
    </form>
    <form className='flex justify-between' onSubmit={handleUpdateAttendance}> 
      <label htmlFor='selectAll' className='flex ml-4 items-center'>
        <p className='mr-2'>Select all</p>
        <input type='checkbox' className='w-4 h-4' id='selectAll' onChange={(e) => {setSelectAllCheckbox(e.target.checked)}}/>
      </label>
      <button type='submit' className='cursor-pointer bg-black text-white rounded m-1 px-2'>Mark attendance</button>
    </form>
    <div className='interns-list-container flex flex-col items-center bg-black h-screen'>
    {
      internsList.length !== 0 && renderInternsList()
    }
    </div>
    {
      showPopup &&
      <Popup text={"success"} iconColor={"green-700"} textColor={"green-700"} bgColor={"green-200"} showPopup={showPopup} setShowPopup={setShowPopup}/>     
    }
    </>
  )
}
