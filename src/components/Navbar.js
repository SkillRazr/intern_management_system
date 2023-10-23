import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddInternModal from "./AddInternModal";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function isActiveLink(href) {
    const regex = new RegExp(`^${href}(\/.*)*$`, "i");
    return regex.test(router.pathname) ? "border-b-4 border-[#ff1493]" : "";
  }

  return (
    <nav className="min-h-[50px]">
      <ul className="flex items-center justify-evenly">
        <li className={`${isActiveLink("/")} px-1`}>
          <p className={`px-1 py-1`}>
            <Link href="/" className="p-1.5">
              Attendance
            </Link>
          </p>
        </li>
        <li className={`${isActiveLink("/notes")} px-1`}>
          <p className={`px-1 py-1`}>
            <Link href="/notes" className="p-1.5">
              Notes
            </Link>
          </p>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </li>
      </ul>
      {showModal && <AddInternModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}
