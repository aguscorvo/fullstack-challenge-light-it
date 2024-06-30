import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createPatient, uploadPhoto } from "../services/api";
import { checkForNewPatients } from "../services/patients";
import type { CreatePatient, FormValues, Patient } from "../types";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { Header } from "./Header";
import InputField from "./InputField";
import { Spinner } from "./Spinner";

const PatientForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormValues>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setPreview(null);

    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    const image = acceptedFiles[0];
    file.readAsDataURL(image);
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/jpg": [".jpg", ".jpeg", ".jpe", ".jif", ".jfif", ".jfi"],
    },
    onDrop,
  });

  const resetForm = () => {
    reset();
    setPreview(null);
    setHasSubmitted(false);
  };

  const onSubmit = async (data: FormValues) => {
    const image = acceptedFiles[0];

    if (typeof image === "undefined") {
      Swal.fire({
        title: "Document Photo missing!",
        text: "Please upload a valid image and try again.",
        icon: "warning",
        confirmButtonText: "Close",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const url = await uploadPhoto(formData);

      const patientData: CreatePatient = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_country_code: data.phone_country_code,
        phone_number: data.phone_number,
        document_photo: url.toString(),
      };

      const patientResponse = (await createPatient(patientData)) as Patient;

      if (patientResponse) {
        setLoading(false);
        await checkForNewPatients();
        Swal.fire({
          title: "Registration Successful!",
          text: "Congratulations! Your account has been successfully created.",
          icon: "success",
          confirmButtonText: "Close",
        });

        resetForm();
      }
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError<Error>;
      if (error.response && error.response.status === 400) {
        const errorDetail = (error.response.data as { detail?: string }).detail;

        Swal.fire({
          title: "Error!",
          text: `${errorDetail}. Please try again.`,
          icon: "error",
          confirmButtonText: "Close",
        });
      } else {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: `An unexpected error occurred. Please try again.`,
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  const patientsList = () => {
    navigate("/");
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={(file as FileWithPath).path}>
      {(file as FileWithPath).path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-800 to-sky-800 p-8 flex flex-col">
      <Header>
        <Button onClick={patientsList}>Back to Patients List</Button>
      </Header>
      <div className="flex items-center justify-center">
        <div className="flex flex-col  items-center justify-center bg-gray-200 2xl:w-2/5 p-12 rounded shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full flex flex-col gap-4"
          >
            <h1 className="text-2xl">Register Patient</h1>
            <div className="sm:flex gap-4">
              <InputField
                label="First Name"
                register={register}
                name="first_name"
                rules={{
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Name must contain only letters",
                  },
                }}
                errors={errors}
                hasSubmitted={hasSubmitted}
              />
              <InputField
                label="Last Name"
                register={register}
                name="last_name"
                rules={{
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last name must contain only letters",
                  },
                }}
                errors={errors}
                hasSubmitted={hasSubmitted}
              />
            </div>
            <div className="sm:flex gap-4">
              <InputField
                label="Email"
                register={register}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /@gmail\.com$/,
                    message: "Email must be a Gmail address",
                  },
                }}
                errors={errors}
                hasSubmitted={hasSubmitted}
              />
              <InputField
                label="Country Code"
                register={register}
                name="phone_country_code"
                rules={{
                  required: "Country code is required",
                  maxLength: { value: 5, message: "Maximum 5 digits allowed." },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Country code must be a number",
                  },
                }}
                errors={errors}
                hasSubmitted={hasSubmitted}
              />
              <InputField
                label="Phone Number"
                register={register}
                name="phone_number"
                rules={{
                  required: "Phone number is required",
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 digits allowed.",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone must be a number",
                  },
                }}
                errors={errors}
                hasSubmitted={hasSubmitted}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Document Photo
              </label>
              <div className="flex w-fit border border-black border-dashed items-center">
                <div className="mt-4 p-4 w-fit " {...getRootProps()}>
                  <input {...getInputProps()} accept="image/jpg" />
                  {isDragActive ? (
                    <p>Drop the file here ...</p>
                  ) : (
                    <>
                      <p>Drag 'n' drop an image</p>
                      <p>(Only JPEG files will be accepted)</p>
                    </>
                  )}
                </div>
                {preview != null && (
                  <img className="h-32" src={preview.toString()} alt="" />
                )}
              </div>
              {hasSubmitted && fileRejectionItems.length > 0 && (
                <ErrorMessage>{fileRejectionItems}</ErrorMessage>
              )}
            </div>
            <div className="flex w-full justify-between">
              <Button onClick={resetForm}>Reset Fields</Button>
              <div className="flex gap-4 items-center ">
                {loading && <Spinner />}
                <Button
                  primary
                  disabled={loading}
                  onClick={async () => {
                    setHasSubmitted(true);
                    const isValid = await trigger();
                    if (!isValid) {
                      return;
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
