import {
  Box,
  Heading,
  HStack,
  Text,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import LecturerView from "./LecturerView";
const Item = ({ doc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        bg={"white"}
        width={"full"}
        alignItems={"start"}
        borderWidth={1}
        p={3}
        my={1}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          console.log("Oucch");
          onOpen();
        }}
      >
        <Box w={"100px"} h={"100px"} bg={"gray.200"}></Box>
        <Box>
          <Heading fontSize={["lg", "xl"]} textAlign={"start"}>
            apple
          </Heading>
          <Text>expertise {"\u2022"} computer networking</Text>
        </Box>
      </HStack>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <LecturerView onClose={onClose} />
      </Slide>
    </>
  );
};

export default Item;
