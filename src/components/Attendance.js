import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import InternDetails from './InternDetails'

export default function Attendance() {

    const [internsList, setInternsList] = useState([])

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
      {
        internsList.length !== 0 &&
        internsList.map((intern) => (
          < InternDetails intern={intern} key={intern.id} />
        ))
      }
    </>
  )
}
