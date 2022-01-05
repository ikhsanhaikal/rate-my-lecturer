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

const Data = [
  { id: 1, name: "orange", department: "informatika", type: "l" },
  { id: 2, name: "apple", department: "informatika", type: "l" },
  { id: 3, name: "avocado", department: "informatika", type: "l" },
  { id: 4, name: "pineapple", department: "informatika", type: "l" },
  { id: 5, name: "struktur data", department: "informatika", type: "s" },
  { id: 6, name: "dasar pemrograman", department: "informatika", type: "s" },
  { id: 7, name: "sistem terdistribusi", department: "informatika", type: "s" },
  { id: 8, name: "komputasi awan", department: "informatika", type: "s" },
];

const MiniSearch = ({ setIsMiniSearchFocus }) => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  return (
    <Box h="full" px={4} py={4}>
      <InputGroup>
        <InputLeftElement
          onClick={() => {
            console.log("return home");
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
            console.log(e.target.value);
            setTextInput(e.target.value);
            if (e.target.value === "") {
              setSearchResult([]);
            } else {
              setSearchResult(
                Data.filter((data) => {
                  return data.name.includes(e.target.value.toLowerCase());
                })
              );
            }
          }}
        />
      </InputGroup>
      <Spacer />
      {searchResult.length !== 0 ? (
        <SuggestionWrapper documents={searchResult} />
      ) : null}
    </Box>
  );
};

export default MiniSearch;
