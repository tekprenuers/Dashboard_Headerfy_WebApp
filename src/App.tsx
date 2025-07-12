import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import MainDashboard from "./Components/Dashboard/MainDashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/adminDashboard" element={<AdminDashboard/>} />
      
     </Route>
  )
);

const App:React.FC = () => {
  return (
      <>
      <RouterProvider router={router} />
      </>
  )
}

export default App
