import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useControllableState,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
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

const SearchBar = () => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const inputEl = useRef(null);
  return (
    <Box
      boxShadow="base"
      bgColor={"white"}
      width={["xs", "sm", "md", "lg", "xl", "2xl"]}
      borderRadius={searchResult.length === 0 ? 50 : 10}
    >
      <InputGroup>
        <InputLeftElement m={1}>
          <SearchIcon color={"gray.400"} />
        </InputLeftElement>
        <Input
          ml={2}
          placeholder="Search"
          ref={inputEl}
          size={"lg"}
          _focus={{
            outline: "none",
            borderBottom: "none",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
          }}
          borderRadius={"none"}
          border={"none"}
          onFocus={() => {}}
          onBlur={() => setSearchResult([])}
          onChange={(e) => {
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
          value={textInput}
        />
      </InputGroup>
      {searchResult.length === 0 ? null : (
        <SuggestionWrapper
          documents={searchResult}
          setTextInput={(name) => {
            inputEl.current.blur();
            setTextInput(name);
          }}
        />
      )}
    </Box>
  );
};

export default SearchBar;
