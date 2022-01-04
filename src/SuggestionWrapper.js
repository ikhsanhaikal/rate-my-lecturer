import { Box } from "@chakra-ui/react";
import SuggestionItem from "./SuggestionItem";
const SuggestionWrapper = (props) => {
  return (
    <Box paddingBottom={1} paddingX={0}>
      {props.documents.map((document) => (
        <SuggestionItem
          key={document.id}
          doc={document}
          setTextInput={props.setTextInput}
        />
      ))}
    </Box>
  );
};

export default SuggestionWrapper;
