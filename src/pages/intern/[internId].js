import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleRight,
  faAngleUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getInterns } from "@/services";
import Popup from "@/components/Popup";

export default function Intern() {
  const router = useRouter();
  const { internId } = router.query;

  const [internData, setInternData] = useState(null);
  const [recentNotes, setRecentNotes] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadInterns = async () => {
      const response = await getInterns();

      if (response.status === 1) {
        const data = response.data.find((intern) => intern.email === internId);
        setInternData(data);
      }
    };

    loadInterns();
  }, [internId]);

  function sendEmail(content) {
    // send email
    navigator.clipboard.writeText(content);
    setShowPopup(true);
  }

  return (
    <>
      <div className="internpage-container h-screen">
        <div className="intern-container-1 flex flex-col items-center">
          <div className="w-60 h-60 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center mt-2">
            <span className="text-9xl mb-[20px]">
              {internData?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-h-[50px] flex items-center mt-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-2xl cursor-pointer"
              onClick={() => sendEmail(internData.email)}
            />
          </div>
        </div>
        <div className="intern-container-2 flex flex-col items-center">
          <div className="intern-tags-container">
            <p className="intern-tags font-medium">Add notes</p>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        {recentNotes && (
          <div className="intern-container-3 flex flex-col items-center mt-4">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                setShowNotes(!showNotes);
              }}
            >
              <p>Recent Notes</p>
              {showNotes ? (
                <FontAwesomeIcon icon={faAngleUp} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
              )}
            </div>
            {showNotes && (
              <div className="notes mt-2 w-full">
                {recentNotes.slice(0, 3).map((note, index) => (
                  <div
                    key={index}
                    className="flex bg-gray-50 rounded p-[5px] m-1.5 items-center border border-black"
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="w-1.5 mr-1.5 ml-0.5"
                    />
                    <p className="font-semibold text-lg">{note.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {showPopup && (
          <Popup
            text={"success"}
            iconColor={"green-700"}
            textColor={"green-700"}
            bgColor={"green-200"}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        )}
      </div>
    </>
  );
}
