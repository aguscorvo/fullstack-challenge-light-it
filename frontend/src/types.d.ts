export type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  document_photo: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  create_at: string;
};

export type FormValues = Pick<
  Patient,
  "first_name" | "last_name" | "email" | "phone_country_code" | "phone_number"
>;

export type CreatePatient = Pick<
  Patient,
  | "first_name"
  | "last_name"
  | "document_photo"
  | "email"
  | "phone_country_code"
  | "phone_number"
>;
