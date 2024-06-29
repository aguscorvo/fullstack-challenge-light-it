import axios from "axios";
import { CreatePatient } from "../types";

export const createPatient = async (data: CreatePatient) => {
  try {
    const response = await axios.post("/api/v1/patients", data);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const fetchPatients = async (since?: number) => {
  try {
    const url = since ? `/api/v1/patients?since=${since}` : "/api/v1/patients";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export const uploadPhoto = async (formData: FormData) => {
  try {
    const {
      data: { url },
    } = await axios.post("/api/v1/patients/upload-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return url;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};
