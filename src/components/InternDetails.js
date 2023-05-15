import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { db1 } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { saveNote } from '@/apiHelper';

export default function InternDetails({ intern, selectAllCheckbox, index, handleCheckboxChange }) {

  const [isChecked, setIsChecked] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [noteType, setNoteType] = useState("Normal")
  const [notes, setNotes] = useState("")
  const router = useRouter()

  async function handlesaveNote(e) {
    e.preventDefault()
    try {
      const response = await saveNote({notes})
      if (response.status === 1) {
        setShowPopup(true)
        setNotes("")
        setOpenNotes(false)
      }  
    } catch (error) {
      console.log(error.message);
    }
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
            </>
          }
          {
            router.pathname === "/" &&
            <input type="checkbox" checked={isChecked} className='w-4 h-4 checked:bg-black' onChange={(e) => {setIsChecked(e.target.checked);}}/>
          }
        </div>
        {
          openNotes && (
            <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={() => setOpenNotes(false)}> 
              <form className='modal-form-container flex flex-col rounded p-2' onClick={e => e.stopPropagation()} onSubmit={handlesaveNote}>
              <select id="notes" name="notes" className='outline-none mb-4' onChange={(e) => {setNoteType(e.target.value)}}>
                <option value="Normal">Normal</option>
                <option value="Alert">Alert</option>
              </select>
                <textarea type='text' placeholder='Notes...' className='w-80 h-44 p-1 border border-black outline-none' onChange={(e) => {setNotes(e.target.value)}}/>
                <button type='submit' className='w-full bg-black mt-4 text-white p-2 rounded'>Save Note</button>
              </form>
            </div>
          )
        }
      </div>
  )
}
