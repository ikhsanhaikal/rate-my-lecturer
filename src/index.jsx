import React from "react";
import App from "./App";
import Lecturer from "./Lecturer";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import LecturerList from "./LecturerList";

import { apolloClient } from "./apolloClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LecturerList />,
      },
      {
        path: "desktop/lecturers/:lecturerId",
        element: <Lecturer />,
      },
    ],
  },
  {
    path: "mobile/lecturers/:lecturerId",
    element: <Lecturer />,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID_GOAUTH}>
      <ChakraProvider>
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={router}></RouterProvider>
        </ApolloProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
