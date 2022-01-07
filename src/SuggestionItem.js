import { Box, Text } from "@chakra-ui/react";

const SuggestionItem = ({ doc, setTextInput }) => {
  return (
    <Box
      m={2}
      _hover={{ bg: "#f2f2f2" }}
      onClick={(e) => {
        setTextInput(doc.name);
      }}
      onPointerDown={(e) => {
        e.preventDefault();
      }}
    >
      <Text fontSize={["xs"]} fontWeight={"semibold"}>
        {/* {doc.type === "l" ? "lecturer" : "subject"} */}
        {"lecturer"}
      </Text>
      <Text fontSize={"large"} fontWeight={"bold"} cursor={"default"}>
        {doc.name}
      </Text>
    </Box>
  );
};

export default SuggestionItem;
