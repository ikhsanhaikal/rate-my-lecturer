import { Link, useOutletContext } from "react-router-dom";
import Item from "./Item";
import { useMediaQuery } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

const GET_LECTURERS = gql`
  query GET_LECTURERS {
    lecturers {
      id
      name
      email
      gender
      lab {
        name
        code
      }
    }
  }
`;

const GET_LECTURERS_BY = gql`
  query GET_LECTURERS_BY(
    $gender: String
    $characters: [Int]
    $subjects: [Int]
  ) {
    lecturersBy(gender: $gender, characters: $characters, subjects: $subjects) {
      name
      email
      lab {
        code
        name
      }
    }
  }
`;

const LecturerList = () => {
  const [filter] = useOutletContext();
  const { loading, error, data } = useQuery(GET_LECTURERS);
  const { data: filterized } = useQuery(GET_LECTURERS_BY, {
    variables: {
      gender: filter.gender !== null ? filter.gender[0] : null,
      characters: null,
      subjects: null,
    },
    skip: filter.gender.length === 0,
  });
  const [below720] = useMediaQuery("(max-width: 720px)");

  console.log(`filter.gender`);
  console.log(filter.gender);
  console.log(filterized);

  if (loading) {
    return <p>loading..</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (filterized !== undefined) {
    return filterized.lecturersBy.map((lecturer) => {
      return (
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
      );
    });
  }

  return data.lecturers.map((lecturer) => (
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
