import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { saveNote } from "@/services";

export default function InternDetails({
  intern,
  selectAllCheckbox,
  handleCheckboxChange,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [noteType, setNoteType] = useState("info");
  const [notes, setNotes] = useState("");
  const [noteDate, setNoteDate] = useState(() =>
    new Date().toLocaleDateString("en-GB").split("/").reverse().join("-")
  );
  const router = useRouter();

  async function handlesaveNote(e) {
    e.preventDefault();
    try {
      const email = intern.email;
      const response = await saveNote({
        docId: email,
        date: Date.parse(noteDate),
        note: { type: noteType, message: notes },
      });
      if (response.status === 1) {
        setNotes("");
        setOpenNotes(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setIsChecked(selectAllCheckbox);
  }, [selectAllCheckbox]);

  return (
    <div className="intern-container w-[98%] flex justify-between items-center border border-black rounded p-1.5 mt-1 mx-1 bg-white">
      <div
        className="w-9 h-8 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center"
        onClick={() => Router.push(`/intern/${intern.email}`)}
      >
        <span className="text-2xl mb-1">
          {intern.name?.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="intern-details-container w-9/12">
        <p className="ml-2 text-xl font-medium">
          {intern.name.charAt(0).toUpperCase() + intern.name?.slice(1)}
        </p>
        <p className="ml-2 text-xs text-zinc-400">
          {new Date(intern.joinDate).toLocaleDateString(navigator.language, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="icon-container w-2/5 flex justify-evenly items-center">
        {router.pathname === "/notes" && (
          <>
            <FontAwesomeIcon
              icon={faPen}
              className="cursor-pointer"
              onClick={() => setOpenNotes(true)}
            />
          </>
        )}
        {router.pathname === "/" && (
          <input
            type="checkbox"
            checked={isChecked}
            className="w-4 h-4 checked:bg-black"
            onChange={(e) => {
              setIsChecked(e.target.checked);
              handleCheckboxChange(e.target.checked, intern.email);
            }}
          />
        )}
      </div>
      {openNotes && (
        <div
          className="w-full h-full fixed top-0 left-0 flex items-center justify-center"
          onClick={() => setOpenNotes(false)}
        >
          <form
            className="modal-form-container flex flex-col rounded p-2"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handlesaveNote}
          >
            <div className="flex items-center mb-4">
              <select
                id="notes"
                name="notes"
                value={noteType}
                className="outline-none w-1/2 mr-1"
                onChange={(e) => {
                  setNoteType(e.target.value);
                }}
              >
                <option value="info">Info</option>
                <option value="alert">Alert</option>
              </select>
              <input
                type="date"
                value={noteDate}
                className="outline-none w-1/2"
                onChange={(e) => {
                  setNoteDate(e.target.value);
                }}
              />
            </div>
            <textarea
              type="text"
              placeholder="Notes..."
              className="w-80 h-44 p-1 border border-black outline-none"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-full bg-black mt-4 text-white p-2 rounded"
            >
              Save Note
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
