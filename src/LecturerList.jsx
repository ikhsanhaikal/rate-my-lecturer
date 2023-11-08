import { Link, useLoaderData } from "react-router-dom";
import Item from "./Item";
import { useMediaQuery } from "@chakra-ui/react";

const LecturerList = () => {
  const { lecturers } = useLoaderData();
  const [below720] = useMediaQuery("(max-width: 720px)");
  return lecturers.map((lecturer) => (
    <Link
      to={
        below720
          ? `mobile/lecturers/${lecturer.id}`
          : `desktop/lecturers/${lecturer.id}`
      }
      key={lecturer.id}
    >
      <Item doc={lecturer} />
    </Link>
  ));
};
export default LecturerList;
