import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { postInternScores, saveNote } from "@/services";
import { toast } from "react-hot-toast";

export default function InternDetails({
  intern,
  selectAllCheckbox,
  handleCheckboxChange,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openScores, setOpenScores] = useState(false);
  const [scores, setScores] = useState({
    codeReview: "",
    development: "",
    learning: "",
    testing: "",
  });
  const [noteType, setNoteType] = useState("info");
  const [notes, setNotes] = useState("");
  const [noteDate, setNoteDate] = useState(() =>
    new Date().toLocaleDateString("en-GB").split("/").reverse().join("-")
  );
  const router = useRouter();

  const handleScoreChange = (event) => {
    setScores((prevScores) => ({
      ...prevScores,
      [event.target.name]: parseInt(event.target.value),
    }));
  };

  async function handlesaveNote(e) {
    e.preventDefault();
    if (notes) {
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
          toast.success("Notes Saved");
        } else {
          toast.error("Save Note Failed");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Message/Note Empty");
    }
  }

  async function handleScoreSubmit(e) {
    e.preventDefault();
    if (scores) {
      try {
        const email = intern.email;
        const response = await postInternScores({ scores, email });
        if (response.status === 1) {
          setScores("");
          setOpenScores(false);
          toast.success("Scores Saved");
        } else if (response.status === 0) {
          setScores("");
          setOpenScores(false);
          toast.error("Scores already given for this month");
        } else {
          toast.error("Save Score Failed");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Scores cannot be empty");
    }
  }

  useEffect(() => {
    setIsChecked(selectAllCheckbox);
  }, [selectAllCheckbox]);

  return (
    <div className="intern-container w-[98%] flex justify-between items-center border border-black rounded p-1.5 mt-1 mx-1 bg-white">
      {/* Avatar */}
      <div
        className="w-9 h-8 bg-gray-50 border border-black cursor-pointer rounded-full flex items-center justify-center"
        onClick={() => Router.push(`/intern/${intern.email}`)}
      >
        <span className="text-2xl mb-1">
          {intern.name?.charAt(0).toUpperCase()}
        </span>
      </div>
      {/* intern details */}
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
            <FontAwesomeIcon
              icon={faChartSimple}
              className="cursor-pointer"
              onClick={() => setOpenScores(true)}
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
      {/* note modal */}
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
            <div className="flex items-center mb-2">
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
                <option value="praise">Praise</option>
                <option value="monthEnd">Month End</option>
                <option value="finalNote">Final Note</option>
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
            <h6 className="text-lg font-medium mb-2">For - {intern.name}</h6>
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
      {/* scores modal */}
      {openScores && (
        <div
          className="w-full h-full fixed top-0 left-0 flex items-center justify-center"
          onClick={() => setOpenScores(false)}
        >
          <form
            className="modal-form-container flex flex-col rounded py-6 px-3"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleScoreSubmit}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-center pb-4">
                Add Monthly Scores
              </h2>
              <h6 className="text-xl font-medium mt-1.5">
                For - {intern.name}
              </h6>
            </div>
            <div className="flex mb-3 space-x-4">
              <div className="flex space-x-4 items-center">
                <label className="text-lg font-semibold">Code Review:</label>
                <input
                  type="number"
                  name="codeReview"
                  value={scores.codeReview}
                  className="hide-number-arrow outline-none border border-[#dcdcdc] rounded w-16 p-[10px]"
                  onChange={handleScoreChange}
                />
              </div>
              <div className="flex space-x-4 items-center">
                <label className="text-lg font-semibold">Development:</label>
                <input
                  type="number"
                  name="development"
                  value={scores.development}
                  className="hide-number-arrow outline-none border border-[#dcdcdc] rounded w-16 p-[10px]"
                  onChange={handleScoreChange}
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="flex space-x-12 items-center">
                <label className="text-lg font-semibold">Learning:</label>
                <input
                  type="number"
                  name="learning"
                  value={scores.learning}
                  className="hide-number-arrow outline-none border border-[#dcdcdc] rounded w-16 p-[10px]"
                  onChange={handleScoreChange}
                />
              </div>
              <div className="flex space-x-16 items-center">
                <label className="text-lg font-semibold">Testing:</label>
                <input
                  type="number"
                  name="testing"
                  value={scores.testing}
                  className="hide-number-arrow outline-none border border-[#dcdcdc] rounded w-16 p-[10px]"
                  onChange={handleScoreChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black mt-8 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
