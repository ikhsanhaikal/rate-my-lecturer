import {
  Box,
  Button,
  Fade,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Slide,
  Spacer,
  useControllableState,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { ArrowBackIcon } from "@chakra-ui/icons";
import SuggestionWrapper from "./SuggestionWrapper";
import LecturerView from "./Lecturer";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Item from "./Item";
const SEARCH_BY_NAME = gql`
  query Search(
    $limit: Int!
    $name: String!
    $count: Boolean
    $cursor: Int
    $skip: Int
  ) {
    search(
      limit: $limit
      name: $name
      count: $count
      cursor: $cursor
      skip: $skip
    ) {
      data {
        id
        email
        name
      }
      total
    }
  }
`;

const MiniSearch = ({ setOnFocus }) => {
  const [findIt, { loading, error, data }] = useLazyQuery(SEARCH_BY_NAME);

  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const [value] = useDebounce(textInput, 1000);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [doc, setDoc] = useState({});

  // useEffect(() => {
  //   onOpen();
  // }, [doc]);

  useEffect(() => {
    if (value.length !== 0) {
      findIt({
        variables: {
          limit: 3,
          name: value,
          count: true,
        },
      });
    }
  }, [value]);

  console.log("data: ", data?.search.data);
  console.log("doc: ", doc);
  return (
    <>
      <Box h="full" px={4} py={4}>
        <InputGroup>
          <InputLeftElement>
            <Icon
              as={ArrowBackIcon}
              fontSize={"2xl"}
              color={"blue.600"}
              onClick={setOnFocus}
            />
          </InputLeftElement>
          <Input
            border={"none"}
            borderRadius={0}
            borderBottom={"1px"}
            borderBottomColor={"gray.300"}
            _focus={{ outline: "none" }}
            size={"lg"}
            pb={2}
            autoFocus={true}
            value={textInput}
            onChange={(e) => {
              console.log(`searching for : ${e.target.value}`);
              setTextInput(e.target.value);
            }}
          />
        </InputGroup>
        <Spacer />
        {data !== undefined ? (
          <SuggestionWrapper
            documents={data.search.data}
            setTextInput={setTextInput}
            setOnFocus={setOnFocus}
            setDoc={setDoc}
          />
        ) : (
          <>waiting..</>
        )}
        {/* {Object.keys(doc).length === 0 ? null : (
          <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
            <LecturerView
              onClose={() => {
                setDoc({});
                onClose();
              }}
              doc={doc}
            />
          </Slide>
        )} */}
      </Box>
    </>
  );
};

export default MiniSearch;
