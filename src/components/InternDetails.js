import Router from 'next/router';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function InternDetails({ intern }) {

    const updateAttendance = async (value) => {
        try {
          const internRef = doc(db, "interns", intern.id);
      
          const now = new Date();
          let attendanceUpdate;

          if (value === "present") {
            attendanceUpdate = {
                "attendance.attended": true,
                "attendance.date": Timestamp.fromDate(now)
              };
          } else {
            attendanceUpdate = {
                "attendance.attended": false,
                "attendance.date": Timestamp.fromDate(now)
              };
          }
      
          await updateDoc(internRef, attendanceUpdate);
      
          console.log("Attendance updated successfully!");
        } catch (error) {
          console.error("Error updating attendance: ", error);
        }
      };

      const toUserPage = (id) => {
        Router.push(`/user/${id}`)
      }

  return (
    <div className='interns-list-container flex flex-col items-center bg-black h-screen'>
        <div className='intern-container w-[98%] flex justify-between items-center border border-black rounded p-1.5 mt-1 mx-1 bg-white'>
            <div className="w-9 h-9 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center" onClick={() => toUserPage(intern.id)}>
                <span className="text-3xl mb-2">{intern.data.name.charAt(0)}</span>
            </div>
            <div className='intern-details-container w-9/12'>
                <p className='ml-2 text-xl font-medium'>{intern.data.name.charAt(0).toUpperCase() + intern.data.name.slice(1)}</p>
                <p className='ml-2 text-xs text-zinc-400'>{new Date(intern.data.joinedOn?.toDate()).toLocaleDateString(navigator.language, {day: 'numeric', month: 'short', year: 'numeric'})}</p>
            </div>
            <div className='icon-container w-3/12 flex justify-evenly items-center'>
                <FontAwesomeIcon icon={faCircleCheck} className='cursor-pointer text-2xl text-green-600' onClick={() => updateAttendance("present")}/>
                <FontAwesomeIcon icon={faCircleXmark} className='cursor-pointer text-2xl text-red-600' onClick={() => updateAttendance("absent")}/>
            </div>
        </div>
    </div>
  )
}
