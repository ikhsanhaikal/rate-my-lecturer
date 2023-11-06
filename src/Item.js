import {
  Box,
  Heading,
  HStack,
  Text,
  Slide,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import LecturerView from "./LecturerView";
const Item = ({ doc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [below600] = useMediaQuery("(max-width: 650px)");

  return (
    <>
      <HStack
        bg={"white"}
        width={"full"}
        alignItems={"start"}
        borderWidth={below600 ? 1 : 0}
        boxShadow="sm"
        my={below600 ? 1 : 0}
        p={3}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          onOpen();
        }}
      >
        <Box
          w={below600 ? "100px" : "50px"}
          h={below600 ? "100px" : "50px"}
          bg={"gray.200"}
          className="profile-pic"
          borderRadius={below600 ? 0 : 50}
          flexShrink={0}
        ></Box>
        <Box textAlign={"start"}>
          <Heading fontSize={["lg", "xl"]} textAlign={"start"}>
            {doc.name}
          </Heading>
          <Text>
            expertise {"\u2022"} {doc.expertise}
          </Text>
        </Box>
      </HStack>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <LecturerView onClose={onClose} doc={doc} />
      </Slide>
    </>
  );
};

export default Item;
