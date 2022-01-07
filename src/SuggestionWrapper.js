import { Box } from "@chakra-ui/react";
import SuggestionItem from "./SuggestionItem";
const SuggestionWrapper = ({ documents, setTextInput }) => {
  return (
    <Box paddingBottom={1} paddingX={0}>
      {documents.map((document) => (
        <SuggestionItem
          key={document.id}
          doc={document}
          setTextInput={setTextInput}
        />
      ))}
    </Box>
  );
};

export default SuggestionWrapper;
