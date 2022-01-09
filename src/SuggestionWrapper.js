import { Box } from "@chakra-ui/react";
import SuggestionItem from "./SuggestionItem";
const SuggestionWrapper = ({ documents, setTextInput, onOpen, setDoc }) => {
  return (
    <Box paddingBottom={1} paddingX={0}>
      {documents.map((document) => (
        <SuggestionItem
          key={document.id}
          doc={document}
          setTextInput={setTextInput}
          setDoc={setDoc}
        />
      ))}
    </Box>
  );
};

export default SuggestionWrapper;
