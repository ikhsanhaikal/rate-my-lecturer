import {
  Box,
  Heading,
  HStack,
  Text,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import LecturerView from "./LecturerView";
const Item = ({ doc, lecturers, setLecturers }) => {
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
          onOpen();
        }}
      >
        <Box
          w={"100px"}
          h={"100px"}
          bg={"gray.200"}
          className="profile-pic"
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
        <LecturerView
          onClose={onClose}
          doc={doc}
          lecturers={lecturers}
          setLecturers={setLecturers}
        />
      </Slide>
    </>
  );
};

export default Item;
