import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Popup({
  icon,
  iconColor,
  text,
  textColor,
  bgColor,
  showPopup,
  setShowPopup,
}) {
  useEffect(() => {
    let timeoutId;

    if (showPopup) {
      timeoutId = setTimeout(() => setShowPopup(false), 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [showPopup]);

  return (
    <div
      className={`fixed top-4 left-1/2 flex items-center justify-around bg-${bgColor} rounded-full py-1 px-4`}
    >
      <FontAwesomeIcon
        icon={(icon && icon) || faCircleCheck}
        className={`mr-2 text-${iconColor}`}
      />
      <p className={`text-[18px] font-medium text-${textColor}`}>{text}</p>
    </div>
  );
}
