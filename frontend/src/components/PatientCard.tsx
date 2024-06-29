import { Patient } from "../types";

type IconsProps = {
  isExpanded: boolean;
};

function Icons({ isExpanded }: IconsProps) {
  return (
    <svg
      className="fill-indigo-500 shrink-0 ml-8"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="7"
        width="16"
        height="2"
        rx="1"
        className={`transform origin-center transition duration-200 ease-out ${
          isExpanded && "!rotate-180"
        }`}
      />
      <rect
        y="7"
        width="16"
        height="2"
        rx="1"
        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
          isExpanded && "!rotate-180"
        }`}
      />
    </svg>
  );
}

type PatientCardProps = {
  patient: Patient;
  isExpanded: boolean;
  onToggle: (index: number, isExpanded: boolean) => void;
};

function PatientCard({ patient, isExpanded, onToggle }: PatientCardProps) {
  const {
    first_name,
    last_name,
    phone_country_code,
    phone_number,
    email,
    document_photo,
  } = patient;

  return (
    <section className="p-4 bg-gray-200 rounded-lg w-full shadow-lg ">
      <div className="p-4">
        <button onClick={onToggle} className="flex justify-between w-full">
          <div className="flex gap-4 items-center w-3/4 justify-start gap-8">
            <img className="h-32" src={document_photo} alt="" />
            <span className="text-xl">
              {first_name} {last_name}
            </span>
          </div>
          <div>
            <Icons isExpanded={isExpanded}></Icons>
          </div>
        </button>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-base ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <article className="overflow-hidden pt-4 flex justify-start gap-8">
            <p>
              Phone number: +{phone_country_code} {phone_number}
            </p>
            <p>Email: {email}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default PatientCard;
