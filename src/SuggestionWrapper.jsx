import { Box, useMediaQuery } from "@chakra-ui/react";
import SuggestionItem from "./SuggestionItem";
const SuggestionWrapper = ({ documents, setTextInput, setDoc }) => {
  const below600 = useMediaQuery(["(max-width: 600px)"]);
  return (
    <Box
      paddingBottom={1}
      paddingX={0}
      position="absolute"
      width={["sm", "md"]}
      bg="white"
      borderBottomRadius={10}
      boxShadow={below600[0] ? "none" : "md"}
    >
      {documents.map((document) => (
        <SuggestionItem
          key={document}
          doc={document}
          setTextInput={setTextInput}
          setDoc={setDoc}
        />
      ))}
    </Box>
  );
};

export default SuggestionWrapper;
