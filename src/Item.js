import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";

const Item = ({ doc }) => {
  return (
    <HStack
      bg={"white"}
      width={"full"}
      alignItems={"start"}
      borderWidth={1}
      p={3}
      my={1}
      _hover={{ cursor: "pointer" }}
    >
      <Box w={"100px"} h={"100px"} bg={"#f2f2f2"}></Box>
      <Box>
        <Heading fontSize={["lg", "xl"]} textAlign={"start"}>
          apple
        </Heading>
        <Text>expertise {"\u2022"} computer networking</Text>
      </Box>
    </HStack>
  );
};

export default Item;
