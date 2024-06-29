import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "../types";
import { ErrorMessage } from "./ErrorMessage";

type InputFieldProps = {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  rules: object;
  errors: FieldErrors<FormValues>;
  hasSubmitted: boolean;
  type?: string;
};

const InputField = ({
  label,
  register,
  name,
  rules,
  errors,
  hasSubmitted,
  type = "text",
}: InputFieldProps) => (
  <div>
    <label className="block font-medium text-gray-700">{label}</label>
    <input
      {...register(name, rules)}
      type={type}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-1 px-2"
    />
    {hasSubmitted && errors[name] && (
      <ErrorMessage>{errors[name].message}</ErrorMessage>
    )}
  </div>
);

export default InputField;
