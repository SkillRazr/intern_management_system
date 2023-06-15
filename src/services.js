import env from "../.env.json";
const baseUrl =
  "https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api";

export const getInterns = async () => {
  return await fetch(`${baseUrl}/getAllInterns`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({}),
  }).then((resp) => resp.json());
};

export const addIntern = async (payload) => {
  // name, joinDate, email, github, notes, mobileNo
  return await fetch(`${baseUrl}/addIntern`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};

export const saveNote = async (payload) => {
  return await fetch(`${baseUrl}/updateInternNotes`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};

export const updateAttendance = async (payload) => {
  return await fetch(`${baseUrl}/updateInternsAttendance`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};

export const postInternScores = async (payload) => {
  return await fetch(`${baseUrl}/postScores`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};
