import { Button } from "./Button";

type Props = {
  onClick: () => void;
};

const FormHeader = ({ onClick }: Props) => {
  return (
    <header className="flex flex-column justify-end pb-8">
      <Button onClick={onClick}>Back to Patients List</Button>
    </header>
  );
};

export default FormHeader;
