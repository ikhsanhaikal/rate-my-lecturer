import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useControllableState,
} from "@chakra-ui/react";
import { useRef } from "react";
import SuggestionWrapper from "./SuggestionWrapper";

const SearchBar = ({ setOnFocus = () => {} }) => {
  const [textInput, setTextInput] = useControllableState({
    defaultValue: "",
  });
  const inputEl = useRef(null);
  return (
    <CustomBox>
      <InputGroup>
        <InputLeftElement my={1} mx={2}>
          <SearchIcon color={"gray.400"} fontSize={["sm", "md"]} />
        </InputLeftElement>
        <Input
          ml={3}
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
          fontSize={["md", "lg"]}
          borderRadius={"none"}
          border={"none"}
          onBlur={() => {}}
          onChange={(e) => {}}
          onFocus={setOnFocus}
          value={textInput}
        />
      </InputGroup>
    </CustomBox>
  );
};

export default SearchBar;

function CustomBox(props) {
  return (
    <Box
      boxShadow="base"
      width={["xs", "s", "md", "xl"]}
      borderRadius={50}
      position="relative"
    >
      {props.children}
    </Box>
  );
}
