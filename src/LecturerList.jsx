import { default as InfiniteScroll } from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Item from "./Item";
import { useMediaQuery } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useBoundStore } from "./useBoundStore";

const GET_LECTURERS = gql`
  query GET_LECTURERS($limit: Int!, $cursorId: Int!, $filter: FilterType!) {
    lecturers(limit: $limit, cursorId: $cursorId, filter: $filter) {
      id
      name
      email
      gender
      lab {
        id
        name
        code
      }
    }
  }
`;

const LecturerList = () => {
  const gender = useBoundStore((state) => state.gender);
  const traits = useBoundStore((state) => state.traits);
  const subjects = useBoundStore((state) => state.subjects);

  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // console.log(`useEffect running...`);
    setCursor(() => 0);
  }, [gender]);

  //console.log(`traits: `, traits);
  const { loading, error, data, fetchMore } = useQuery(GET_LECTURERS, {
    variables: {
      limit: 12,
      cursorId: 0,
      filter: {
        subjects: subjects,
        characters: traits,
        gender: gender !== null ? gender[0] : null,
      },
    },
    onCompleted: (data) => {
      //console.log(`LecturerList(): (onCompleted) was called`);
      if (data !== undefined && data.lecturers.length > 0) {
        let lastId = data.lecturers[data.lecturers.length - 1];
        setCursor(() => parseInt(lastId.id));
        setHasMore(() => true);
      } else {
        setHasMore(false);
      }
    },
    onError: (error) => {
      console.log(`onError: i was called`, error);
    },
  });

  const [below720] = useMediaQuery("(max-width: 720px)");

  if (loading) {
    return <p>loading..</p>;
  }

  if (error) {
    console.log(`error on getting lecturers `);
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
      dataLength={data !== undefined ? data.lecturers.length : 0}
      next={() => {
        console.log("next was called");
        if (true) {
          console.log("loadMore() called with cursor: ", cursor);
          fetchMore({
            variables: {
              cursorId: cursor,
            },
          })
            .then((value) => {
              const tmp = cursor;
              console.log(`fetchMore() with cursor ${tmp}: (then): `, value);
              console.log(`hasMore before: `, hasMore);
              if (value === undefined || value.data.lecturers.length === 0) {
                console.log(`done no more values: `, value);
                setHasMore(false);
              } else {
                console.log("then else");
                const newCursor =
                  value.data.lecturers[value.data.lecturers.length - 1].id;
                setCursor(parseInt(newCursor));
                console.log(`more data: `, value.data);
              }
            })
            .catch((reason) => {
              console.log(`reason error: `, reason);
            });
        }
      }}
      hasMore={hasMore}
      scrollableTarget="scrollableGridItem"
      loader={
        <div className="loader" key={0}>
          fetchMore(): Loading ... hasMore{" "}
          {hasMore === false ? "false" : "true"}
        </div>
      }
    >
      {data !== undefined ? (
        data.lecturers.map((lecturer) => (
          <Link to={`lecturers/${lecturer.id}`} key={lecturer.id}>
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
