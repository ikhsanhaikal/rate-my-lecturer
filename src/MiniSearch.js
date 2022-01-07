import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useControllableState,
} from "@chakra-ui/react";

import { useState } from "react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import SuggestionWrapper from "./SuggestionWrapper";

const MiniSearch = ({ setIsMiniSearchFocus, lecturers }) => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const [searchResult, setSearchResult] = useState([]);
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
        />
      ) : null}
    </Box>
  );
};

export default MiniSearch;
