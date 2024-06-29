import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<PatientList />} />
      <Route path="register" element={<PatientForm />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
