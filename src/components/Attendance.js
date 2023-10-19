import React, { useEffect, useState } from "react";
import InternDetails from "./InternDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getInterns, updateAttendance } from "../services";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { toast } from "react-hot-toast";

export default function Attendance() {
  const [internsList, setInternsList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [selectedDocIds, setselectedDocIds] = useState([]);
  const [showProceed, setShowProceed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showAll, setShowAll] = useState(false);

  const uniqueDocIdArray = [...new Set(selectedDocIds)];

  useEffect(() => {
    if (selectAllCheckbox) {
      setselectedDocIds(internsList.map((intern) => intern.email));
    } else {
      setselectedDocIds([]);
    }
  }, [selectAllCheckbox, internsList]);

  function handleCheckboxChange(isChecked, email) {
    if (isChecked === true) {
      const newValues = [...selectedDocIds];
      newValues.push(email);
      setselectedDocIds(newValues);
    } else {
      const newValues = [...selectedDocIds];
      const index = newValues.findIndex((value) => value === email);
      newValues.splice(index, 1);
      setselectedDocIds(newValues);
    }
  }

  useEffect(() => {
    const filteredList = internsList.filter((intern) =>
      intern.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchList(filteredList);
  }, [searchQuery, internsList]);

  useEffect(() => {
    const loadInterns = async () => {
      const response = await getInterns();

      if (response.status === 1) {
        setInternsList(response.data);
      }
    };

    loadInterns();
  }, []);

  async function handleUpdateAttendance() {
    try {
      const response = await updateAttendance({
        docIds: uniqueDocIdArray,
        date: Date.parse(selectedDate),
      });

      if (response.status === 1) {
        setSelectAllCheckbox(false);
        setShowProceed(false);
        toast.success("Attendance Updated Successfully");
      } else {
        toast.error("Attendance Update Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleMarkAbsence() {
    if (uniqueDocIdArray.length === 0) {
      toast.error("Please Select Interns");
    } else {
      setShowProceed(true);
    }
  }

  function renderInternsList() {
    const list = searchList.length === 0 ? internsList : searchList;
    return list
      .filter((user) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const endDate = user.endDate ?? currentDate;

        const userStartDate = new Date(user?.joinDate);
        const userEndDate = new Date(endDate);

        console.log(`start : ${userStartDate}`);
        console.log(`End : ${userEndDate}`);

        const isDateInRange =
          userStartDate.getTime() <= new Date(selectedDate).getTime() &&
          userEndDate.getTime() >= new Date(selectedDate).getTime();
        return isDateInRange;
      })
      .map((intern, index) => (
        <InternDetails
          data-testid="internlist"
          key={index}
          intern={intern}
          handleCheckboxChange={handleCheckboxChange}
          index={index}
          selectAllCheckbox={selectAllCheckbox}
        />
      ));
  }

  function renderFullInterns() {
    const list = showAll ? internsList : searchList;
    // Use showAllMode state to toggle filtering
    return list.map((intern, index) => (
      <InternDetails
        key={index}
        intern={intern}
        handleCheckboxChange={handleCheckboxChange}
        index={index}
        selectAllCheckbox={selectAllCheckbox}
      />
    ));
  }

  return (
    <>
      <form className="flex items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="ml-4" />
        <input
          type="text"
          name="search"
          value={searchQuery}
          role="internSearchBox"
          title="intern search"
          className="p-2 outline-none w-full"
          placeholder="Enter intern name..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
      <div className="flex justify-between items-center">
        <label htmlFor="selectAll" className="flex ml-4 items-center">
          <h4 className="mr-2" 
          checked={false} data-testid="selectAll" >
            Select all
          </h4>
          <input
            type="checkbox"
            className="w-4 h-4"
            id="selectAll"
            onChange={(e) => {
              setSelectAllCheckbox(e.target.checked);
            }}
          />
        </label>
        <label htmlFor="showAll" className="flex ml-4 items-center">
          <h4 className="mr-2" data-testid="showAll" checked={false}>Show all</h4>
          <input
            type="checkbox"
            className="w-4 h-4"
            id="showAll"
            onChange={() => {
              setShowAll(!showAll);
            }}
          />
        </label>

        {/* <p>Show all</p> */}
        <div className="flex items-center" data-testid="select-date">
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(new Date(newDate));
            }}
            multiple={false}
            render={<Icon />}
          />
          <button
            className="cursor-pointer bg-black text-white rounded m-1 px-2"
            data-testid="attendance-confimation"
            onClick={handleMarkAbsence}
          >
            Mark Absence
          </button>
        </div>
      </div>
      {!showAll ? (
        <div className="interns-list-container flex flex-col items-center bg-black h-screen">
          {internsList.length !== 0 && renderInternsList()}
        </div>
      ) : (
        <div className="interns-list-container flex flex-col items-center bg-black h-screen">
          {internsList.length !== 0 && renderFullInterns()}
        </div>
      )}
      {showProceed && (
        <div
          className="w-full h-full fixed top-0 left-0 flex items-center justify-center"
          onClick={() => setShowProceed(false)}
        >
          <div
            className="modal-form-container flex flex-col justify-between rounded p-5 w-96 min-h-[200px] space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-2xl font-semibold text-center text-red-600">
              Confirm Mark Absence
            </p>
            <div>
              <p className="font-medium">
                For Date - {new Date(selectedDate).toDateString()}
              </p>
              <p className="font-medium py-3 underline">Interns</p>
              {uniqueDocIdArray.map((id) => (
                <p className="mt-1" key={id}>
                  {id}
                </p>
              ))}
            </div>
            <div className="flex items-center justify-evenly">
              <button
                className="w-1/3 bg-stone-200 mt-4 p-2 rounded"
                onClick={() => setShowProceed(false)}
              >
                Cancel
              </button>
              <button
                className="w-1/3 bg-black mt-4 text-white p-2 rounded"
                onClick={handleUpdateAttendance}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
