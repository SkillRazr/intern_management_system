import env from "../.env.json";

export const getInterns = async () => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/getAllInterns`,
    {
      headers: {
        "Content-Type": "application/json",
        "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
      },
      method: "POST",
      body: JSON.stringify({}),
    }
  ).then((resp) => resp.json());
};

export const addIntern = async (payload) => {
  // name, joinDate, email, github, notes, mobileNo
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/addIntern`,
    {
      headers: {
        "Content-Type": "application/json",
        "skillrazr-sub-app": env["NEXT_PUBLIC_INTERN_API_KEY"],
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  ).then((resp) => resp.json());
};

export const saveNote = async (payload) => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/updateInternNotes`,
    {
      headers: {
        "Content-Type": "application/json",
        "skillrazr-sub-app": "interns!1234#@234_hello",
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  ).then((resp) => resp.json());
};

export const updateAttendance = async (payload) => {
  return await fetch(
    `https://asia-south1-genlent-8aab7.cloudfunctions.net/skillRazrIntern-api/updateInternsAttendance`,
    {
      headers: {
        "Content-Type": "application/json",
        "skillrazr-sub-app": "interns!1234#@234_hello",
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  ).then((resp) => resp.json());
};