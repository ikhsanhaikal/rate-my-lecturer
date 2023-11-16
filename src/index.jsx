import React from "react";
import App from "./App";
import Lecturer from "./Lecturer";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import LecturerList from "./LecturerList";

const client = new ApolloClient({
  uri: "http://127.0.0.1:5050/graphql",
  cache: new InMemoryCache(),
});

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
    <ChakraProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router}></RouterProvider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
