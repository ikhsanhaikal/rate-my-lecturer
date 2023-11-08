import React from "react";
import App from "./App";
import Lecturer, { loader as lecturerLoader } from "./Lecturer";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import data from "./db.json";
import LecturerList from "./LecturerList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LecturerList />,
        loader: () => {
          const { lecturers } = data;
          return { lecturers };
        },
      },
      {
        path: "desktop/lecturers/:lecturerId",
        element: <Lecturer />,
        loader: lecturerLoader,
      },
    ],
  },
  {
    path: "mobile/lecturers/:lecturerId",
    element: <Lecturer />,
    loader: () => {
      const { lecturers } = data;
      return { lecturer: lecturers[0] };
    },
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}>
        <Routes>
          <Route path="/todos" element={<h1>hello, world</h1>} />
        </Routes>
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
