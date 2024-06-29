import { Patient } from "../types";

export const getStoredPatients = () => {
  const storedPatients = localStorage.getItem("patients");
  return storedPatients ? JSON.parse(storedPatients) : null;
};

export const getStoredTimestamp = () => {
  const storedTimestamp = localStorage.getItem("timestamp");
  return storedTimestamp ? parseInt(storedTimestamp, 10) : null;
};

export const updateLocalStorage = (patients: Array<Patient>) => {
  localStorage.setItem("patients", JSON.stringify(patients));
  const currentTimestamp = Date.now();
  localStorage.setItem("timestamp", currentTimestamp.toString());
};
