import { useEffect, useState } from "react";
import {useRouter} from "next/router"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'


export default function user() {

    const router = useRouter()
    const { userId } = router.query;

    const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {

      let userDoc;
      if (userId) {
        const fetchUser = doc(db, 'interns', userId);
        userDoc = await getDoc(fetchUser);  
      }
    
      if (userDoc) {
        const data = userDoc.data();
        setUserData(data);
      }
    }

    fetchUserData();
  }, [userId]);

  function sendEmail() {
    // send email
  }
    
    return (
      <div className="userpage-container">
        <div className="user-container-1 flex flex-col items-center">
          <div className="w-60 h-60 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center mt-10" onClick={() => toUserPage(intern.id)}>
            <span className="text-9xl mb-10">{userData?.name.charAt(0)}</span>
          </div>
          <div className="min-h-[50px] flex items-center mt-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl cursor-pointer" onClick={sendEmail}/>
          </div>
        </div>
        <div className="user-container-2">
  
        </div>
      </div>
    )
  }
  