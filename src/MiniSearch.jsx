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

import { ArrowBackIcon } from "@chakra-ui/icons";
import SuggestionWrapper from "./SuggestionWrapper";
import LecturerView from "./Lecturer";

const MiniSearch = ({ setOnFocus }) => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doc, setDoc] = useState({});

  useEffect(() => {
    onOpen();
  }, [doc]);

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
        {/* {derivedData.length !== 0 ? (
          <SuggestionWrapper
            documents={searchResult}
            setTextInput={setTextInput}
            setDoc={setDoc}
          />
        ) : null} */}
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
    </>
  );
};

export default MiniSearch;
