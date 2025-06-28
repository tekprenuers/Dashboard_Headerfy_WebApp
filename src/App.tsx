import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import MainDashboard from "./Components/Dashboard/MainDashboard";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<MainDashboard />} />
      
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
