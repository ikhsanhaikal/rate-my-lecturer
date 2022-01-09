import {
  Box,
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

import { ArrowBackIcon } from "@chakra-ui/icons";
import SuggestionWrapper from "./SuggestionWrapper";
import LecturerView from "./LecturerView";

const MiniSearch = ({ setIsMiniSearchFocus, lecturers }) => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState([]);
  const [doc, setDoc] = useState({});

  useEffect(() => {
    onOpen();
  }, [doc]);

  return (
    <Box h="full" px={4} py={4}>
      <InputGroup>
        <InputLeftElement
          onClick={() => {
            setIsMiniSearchFocus(false);
          }}
        >
          <Icon as={ArrowBackIcon} fontSize={"2xl"} color={"blue.600"} />
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
            setTextInput(e.target.value);
            if (e.target.value === "") {
              setSearchResult([]);
            } else {
              setSearchResult(
                lecturers.filter((lecturer) => {
                  return lecturer.name.includes(e.target.value.toLowerCase());
                })
              );
            }
          }}
        />
      </InputGroup>
      <Spacer />
      {searchResult.length !== 0 ? (
        <SuggestionWrapper
          documents={searchResult}
          setTextInput={setTextInput}
          setDoc={setDoc}
        />
      ) : null}
      {Object.keys(doc).length === 0 ? null : (
        <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
          <LecturerView
            onClose={() => {
              setDoc({});
              onClose();
            }}
            doc={doc}
          />
        </Slide>
      )}
    </Box>
  );
};

export default MiniSearch;
