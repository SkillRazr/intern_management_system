import { useEffect, useState } from "react";
import {useRouter} from "next/router"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function intern() {

    const router = useRouter()
    const { internId } = router.query;

    const [internData, setInternData] = useState(null);

  useEffect(() => {
    async function fetchInternData() {

      let internDoc;
      if (internId) {
        const fetchintern = doc(db, 'interns', internId);
        internDoc = await getDoc(fetchintern);  
      }
    
      if (internDoc) {
        const data = internDoc.data();
        setInternData(data);
      }
    }

    fetchInternData();
  }, [internId]);

  function sendEmail() {
    // send email
  }
    
    return (
      <div className="internpage-container h-screen">
        <div className="intern-container-1 flex flex-col items-center">
          <div className="w-60 h-60 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center mt-10">
            <span className="text-9xl mb-10">{internData?.name.charAt(0)}</span>
          </div>
          <div className="min-h-[50px] flex items-center mt-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl cursor-pointer" onClick={sendEmail}/>
          </div>
        </div>
        <div className="intern-container-2 flex flex-col items-center">
          <div className="intern-tags-container">
            <p className="intern-tags">Assign a Activity</p>
            <FontAwesomeIcon icon={faAngleRight}/>
          </div>
          <div className="intern-tags-container">
            <p className="intern-tags">Add notes</p>
            <FontAwesomeIcon icon={faAngleRight}/>
          </div>
          <div className="intern-tags-container hover:text-red-700 hover:border-red-700">
            <p className="intern-tags">Remove Intern</p>
            <FontAwesomeIcon icon={faAngleRight}/>
          </div>
        </div>
      </div>
    )
  }
  