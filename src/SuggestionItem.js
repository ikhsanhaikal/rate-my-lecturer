import { Box, Text } from "@chakra-ui/react";

const SuggestionItem = ({ doc, setDoc }) => {
  return (
    <Box
      m={2}
      _hover={{ bg: "#f2f2f2" }}
      onClick={(e) => {
        setDoc(doc);
      }}
      onPointerDown={(e) => {
        e.preventDefault();
      }}
      maxW="2xl"
    >
      <Text fontSize={["xs"]} fontWeight={"semibold"}>
        {"lecturer"}
      </Text>
      <Text
        fontSize={["md", "lg", "larger", "xl"]}
        fontWeight={"bold"}
        cursor={"default"}
      >
        {doc}
      </Text>
    </Box>
  );
};

export default SuggestionItem;
