import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../hooks/usePatients";
import type { Patient } from "../types";
import { Button } from "./Button";
import PatientCard from "./PatientCard";

function PatientList() {
  const patients = usePatients();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const navigate = useNavigate();

  function registerPatient() {
    navigate("/register");
  }

  const handleToggle = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleCollapseAll = () => {
    setExpandedCards([]);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-800 to-sky-800 p-8">
      <header className="flex gap-4 justify-end pb-8 sticky top-8">
        {expandedCards.length > 0 && (
          <Button onClick={handleCollapseAll}>Collapse all</Button>
        )}
        <Button onClick={registerPatient}>Register a Patient</Button>
      </header>

      {patients && (
        <div className="flex flex-col w-full items-center justify-center">
          <section className="flex flex-col items-center justify-center gap-2 sm-w-1/3">
            {patients.map((patient: Patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isExpanded={expandedCards.includes(patient.id)}
                onToggle={() => handleToggle(patient.id)}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default PatientList;
