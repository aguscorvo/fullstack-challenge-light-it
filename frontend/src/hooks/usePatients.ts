import { useEffect, useState } from "react";
import { checkForNewPatients } from "../services/patients";
import type { Patient } from "../types";

export function usePatients() {
  const [patients, setPatients] = useState<Array<Patient> | undefined>();

  useEffect(() => {
    const getPatients = async () => {
      const newPatients = await checkForNewPatients();
      setPatients(newPatients);
    };
    getPatients();
  }, []);

  return patients;
}
