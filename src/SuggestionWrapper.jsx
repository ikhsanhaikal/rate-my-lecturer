import { Box, useMediaQuery } from "@chakra-ui/react";
import SuggestionItem from "./SuggestionItem";
import { Link } from "react-router-dom";
const SuggestionWrapper = ({ documents, setOnFocus, setTextInput, setDoc }) => {
  const below600 = useMediaQuery(["(max-width: 600px)"]);
  console.log("documents: ", documents);
  return (
    <Box
      paddingBottom={1}
      paddingX={0}
      position="absolute"
      width={["sm", "md"]}
      bg="white"
      borderBottomRadius={10}
      mt={3}
      //boxShadow={below600[0] ? "none" : "md"}
    >
      {documents.map((document) => (
        <Link
          to={`lecturers/${document.id}`}
          onClick={() => setOnFocus()}
          key={document.id}
        >
          <SuggestionItem
            key={document.id}
            doc={document}
            setTextInput={setTextInput}
            setDoc={setDoc}
          />
        </Link>
      ))}
    </Box>
  );
};

export default SuggestionWrapper;
