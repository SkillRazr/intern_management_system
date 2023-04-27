import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import InternDetails from './InternDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export default function Attendance() {

    const [internsList, setInternsList] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    function handleSearchSubmit() {
      e.preventDefault()
      
    }

    useEffect(() => {
        // Get a reference to the "interns" collection
        const internsCollection = collection(db, 'interns');
    
        // Listen for changes to the collection
        // const getInternData = 
        onSnapshot(internsCollection, (snapshot) => {
          const internsData = [];
    
          // Convert the snapshot data to an array of objects
          
          snapshot.forEach((doc) => {
            internsData.push({ id: doc.id, data: doc.data() });
          });
    
          // Update the state with the array of objects
          setInternsList(internsData);
        });

    
        // // Unsubscribe from the collection when the component unmounts
        // return () => {
        //   getInternData();
        // };
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
