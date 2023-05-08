import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faPen } from '@fortawesome/free-solid-svg-icons';

export default function InternDetails({ intern, selectAllCheckbox, index, handleCheckboxChange }) {

  const [isChecked, setIsChecked] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState("")
  // const [showActivityForm, setShowActivityForm] = useState(false)
  const router = useRouter()

  const saveNote = async (e) => {
    e.preventDefault()
    const internRef = doc(db, "interns", intern.email);
    const internDoc = await getDoc(internRef)
    const notesArray = internDoc.data().notes || []
    notesArray.push(notes)
    await updateDoc(internRef, { notes: notesArray})
  }
      
      useEffect(() => {
        setIsChecked(selectAllCheckbox)
      }, [selectAllCheckbox])

      if (router.pathname === "/") {
        useEffect(() => {
          if(isChecked === true || isChecked === false){
            handleCheckboxChange(index, isChecked)
          }
        }, [isChecked])
      }

      const toUserPage = (id) => {
        Router.push(`/intern/${id}`)
      }

  return (
      <div className='intern-container w-[98%] flex justify-between items-center border border-black rounded p-1.5 mt-1 mx-1 bg-white'>
        <div className="w-9 h-8 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center" onClick={() => toUserPage(intern.email)}>
          <span className="text-3xl mb-2">{intern.name?.charAt(0)}</span>
        </div>
        <div className='intern-details-container w-9/12'>
          <p className='ml-2 text-xl font-medium'>{intern.name.charAt(0).toUpperCase() + intern.name?.slice(1)}</p>
          <p className='ml-2 text-xs text-zinc-400'>{new Date(intern.joinDate).toLocaleDateString(navigator.language, {day: 'numeric', month: 'short', year: 'numeric'})}</p>
        </div>
        <div className='icon-container w-2/5 flex justify-evenly items-center'>
          {
            router.pathname === "/notes" &&
            <>
              <FontAwesomeIcon icon={faPen} className='cursor-pointer' onClick={() => setOpenNotes(true)}/>
              {/* <FontAwesomeIcon icon={faCalendarPlus} className='cursor-pointer text-lg' onClick={() => setShowActivityForm(true)}/> */}
            </>
          }
          {
            router.pathname === "/" &&
            <input type="checkbox" checked={isChecked} onChange={(e) => {setIsChecked(e.target.checked);}}/>
          }
        </div>
        {
          openNotes && (
            <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={() => setOpenNotes(false)}> 
              <form className='modal-form-container flex flex-col rounded p-2' onClick={e => e.stopPropagation()} onSubmit={saveNote}>
                <textarea type='text' placeholder='Notes...' className='w-80 h-44 p-1 border border-black outline-none' onChange={(e) => {setNotes(e.target.value)}}/>
                <button type='submit' className='w-full bg-black mt-4 text-white p-2 rounded'>Save Note</button>
              </form>
            </div>
          )
        }
        {/* {
          showActivityForm && (
            <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={() => setShowActivityForm(false)}>
              <form className='w-96 modal-form-container rounded p-2' onClick={e => e.stopPropagation()}>
                <textarea type='text' className='w-full h-24 rounded outline-none border border-gray-500 p-2' placeholder='Assign activity'/>
                <input type='date' className='rounded outline-none border border-gray-500 p-1 mt-1'/>
              </form>
            </div>
          )
        } */}
      </div>
  )
}
