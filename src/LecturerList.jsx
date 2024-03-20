import InfiniteScroll from "react-infinite-scroller";
import { Link, useOutletContext } from "react-router-dom";
import Item from "./Item";
import { useMediaQuery } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_LECTURERS = gql`
  query GET_LECTURERS($limit: Int!, $cursorId: Int!) {
    lecturers(limit: $limit, cursorId: $cursorId) {
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

const LecturerList = ({ scrollContainer }) => {
  const [filter] = useOutletContext();
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_LECTURERS, {
    variables: { limit: 12, cursorId: 0 },
    onCompleted: (data) => {
      console.log(`i (onCompleted) was called`);
      if (data !== undefined && data.lecturers.length > 0) {
        let lastId = data.lecturers[data.lecturers.length - 1];
        setCursor(() => parseInt(lastId.id));
        console.log(`setCursor new to: `, lastId.id);
      }
      //setHasMore(false);
    },
  });

  const [below720] = useMediaQuery("(max-width: 720px)");

  if (loading) {
    return <p>loading..</p>;
  }

  if (error) {
    if (
      error.graphQLErrors.find(
        (error) => error.extensions.code === "AUTH0RIZATION_ERROR"
      )
    ) {
    }
    console.log(`error: `, error);
    return <p>error</p>;
  }

  return (
    <InfiniteScroll
      loadMore={() => {
        console.log("hey loadMore was called with cursor: ", cursor);
        fetchMore({
          variables: {
            cursorId: cursor,
          },
        })
          .then((value) => {
            console.log(`then: `, value);
            console.log(`hasMore before: `, hasMore);
            if (value === undefined || value.data.lecturers.length === 0) {
              console.log(`done no more values: `, value);
              setHasMore(false);
            } else {
              console.log("esles");
              console.log(value);
              const newCursor =
                value.data.lecturers[value.data.lecturers.length - 1].id;
              console.log(`else statemtn run, newcursor: `, newCursor);
              setCursor(parseInt(newCursor));
            }
            console.log(`hasMore after: `, hasMore);
          })
          .catch((reason) => {
            console.log(`reason error: `, reason);
          });
      }}
      hasMore={hasMore}
      threshold={250}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      useWindow={false}
    >
      {data !== undefined ? (
        data.lecturers.map((lecturer) => (
          <Link
            to={
              //`/lecturers/${lecturer.id}`
              below720
                ? `mobile/lecturers/${lecturer.id}`
                : `desktop/lecturers/${lecturer.id}`
            }
            key={lecturer.id}
          >
            <Item doc={lecturer} />
          </Link>
        ))
      ) : (
        <p>meh data is null or undefined</p>
      )}
    </InfiniteScroll>
  );
};
export default LecturerList;
