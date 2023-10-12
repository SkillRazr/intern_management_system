import { addIntern } from "@/services";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

  
export default function AddInternModal({ onClose, showModal  })   {
  const [formData, setformData] = useState(
    JSON.parse(localStorage.getItem("formData")) || {}
  );
  const [name, setName] = useState(formData.name || "");
  const [mobileNo, setMobileNo] = useState(formData.mobileNo || "");
  const [email, setEmail] = useState(formData.email || "");
  const [github, setGithub] = useState(formData.github|| "");;
  const [linkedin, setLinkedin] = useState(formData.linkedin || "");
  const [joinDate, setJoinDate] = useState(formData.joinDate || "");
  const [endDate, setEndDate] = useState(formData.endDate || "");
  const [notes, setNotes] = useState(formData.notes || "");

  

  const saveFormData = () => {
    const formData = {
      name,
      mobileNo,
      email,
      github,
      linkedin,
      joinDate,
      endDate,
      notes,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  };
  

  const internForm = async (e) => {
    e.preventDefault();
    try {
      const response = await addIntern({
        name,
        mobileNo,
        email,
        github,
        linkedin,
        joinDate,
        endDate,
        notes,
      });
      if (response.status === 1) {
        const formElement = document.getElementById("intern-form");
        formElement.reset();
        onClose();
        toast.success("Intern Added")
        localStorage.removeItem("formData")
      } else {
        toast.error("Adding Intern Failed")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    saveFormData();
  }, );




  return (
    <div
      className="modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="modal-form-container max-w-md bg-white rounded p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2">
          <h6 className="font-bold text-xl font-sans">Intern details</h6>
        </div>
        <form
          id="intern-form"
          className="flex flex-col justify-center"
          onSubmit={internForm}
        >
          <div className="two-labels-container flex">
            <label htmlFor="name" className="intern-form-label">
              <p>Name</p>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="intern-form-input"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label htmlFor="phoneNo" className="intern-form-label ml-2">
              <p>Phone number</p>
              <input
                type="tel"
                name="phoneNo"
                id="phoneNo"
                value={mobileNo}
                pattern="^\+\d{2}\s\d{10}$"
                className="intern-form-input"
                placeholder="+91 1234567890"
                required
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </label>
          </div>

          <label htmlFor="email" className="intern-form-label">
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              className="intern-form-input"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label htmlFor="github" className="intern-form-label">
            <p>GitHub URL</p>
            <input
              type="url"
              name="github"
              id="github"
              value={github}
              pattern="^https:\/\/github\.com\/.+$"
              className="intern-form-input"
              onChange={(e) => {
                setGithub(e.target.value);
              }}
            />
          </label>

          <label htmlFor="linkedin" className="intern-form-label">
            <p>Linkedin URL</p>
            <input
              type="url"
              name="linkedin"
              id="linkedin"
              value={linkedin}
              pattern="^https:\/\/linkedin\.com\/.+$"
              className="intern-form-input"
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
            />
          </label>

          <div className="two-labels-container flex">
            <label htmlFor="join" className="intern-form-label">
              <p>Joined date</p>
              <input
                type="date"
                name="join"
                id="join"
                value={joinDate}
                className="intern-form-input"
                required
                onChange={(e) => {
                  setJoinDate(e.target.value);
                }}
              />
            </label>
            <label htmlFor="end" className="intern-form-label ml-2">
              <p>End date</p>
              <input
                type="date"
                name="end"
                id="end"
                value={endDate}
                className="intern-form-input"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </label>
          </div>

          <label htmlFor="notes" className="intern-form-label">
            <p>Notes</p>
            <textarea
              type="text"
              name="notes"
              id="notes"
              value={notes}
              className="intern-form-input max-h-24"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-black mt-4 text-white p-2 rounded"
          >
            Add intern
          </button>
        </form>
      </div>
    </div>
  );
}
