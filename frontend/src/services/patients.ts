import { fetchPatients } from "./api";
import {
  getStoredPatients,
  getStoredTimestamp,
  updateLocalStorage,
} from "./localStorage";

export const checkForNewPatients = async () => {
  const storedPatients = getStoredPatients();
  const storedTimestamp = getStoredTimestamp();

  if (!storedPatients && !storedTimestamp) {
    const allPatients = await fetchPatients();
    if (allPatients.length > 0) {
      updateLocalStorage(allPatients);
      return allPatients;
    }
  } else if (storedTimestamp) {
    const newPatients = await fetchPatients(storedTimestamp);
    if (newPatients.length > 0) {
      const updatedPatients = [...storedPatients, ...newPatients];
      updateLocalStorage(updatedPatients);
      return updatedPatients;
    } else {
      return storedPatients;
    }
  }
};
