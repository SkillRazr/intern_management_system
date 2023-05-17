import React, { useEffect, useState } from 'react'
import InternDetails from './InternDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getInterns, updateAttendance } from '../apiHelper';
import { db1 } from '../firebase'
import { collection, doc, getDoc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import Popup from './Popup';
import DatePicker from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';

export default function Attendance() {

    const [internsList, setInternsList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false)
    const [selectedDocIds, setselectedDocIds] = useState([]);
    const [showPopup, setShowPopup] = useState(false)
    const [selectedDates, setSelectedDates] = useState([Date.now()]);
    const uniqueDocIdArray = [...new Set(selectedDocIds)];


    useEffect(() => {
      if (selectAllCheckbox) {
        setselectedDocIds(internsList.map(intern => intern.email));
      } else {
        setselectedDocIds([]);
      }
    }, [selectAllCheckbox]);

    function handleCheckboxChange (isChecked, email) {
      if (isChecked === true) {
        const newValues = [...selectedDocIds];
        newValues.push(email);
        setselectedDocIds(newValues);  
      }else {
        const newValues = [...selectedDocIds]
        newValues.pop(email)
        setselectedDocIds(newValues)
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
          const response = await updateAttendance({docIds: uniqueDocIdArray, date: selectedDates[0]})
          if (response.status === 1) {
            setShowPopup(true)
            setSelectAllCheckbox(false)
          }
        } catch (error) {
          console.log(error.message);
        }
        
      }

      function renderInternsList() {
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
      <div className='flex items-center'>
        <DatePicker
          value={selectedDates}
          onChange={array => { 
            const dateArray = array.join()
            setSelectedDates(dateArray.split(','))
          }}
          multiple
          render={<Icon />}
        />
        <button type='submit' className='cursor-pointer bg-black text-white rounded m-1 px-2'>Mark attendance</button>
      </div>
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
