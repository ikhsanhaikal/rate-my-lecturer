import {
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

const Item = ({ doc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [below720] = useMediaQuery("(max-width: 720px)");

  return (
    <>
      <HStack
        bg="white"
        width="full"
        alignItems={"start"}
        borderWidth={below720 ? 1 : 0.5}
        borderRadius="5"
        borderColor="#f1f3f4"
        boxShadow="sm"
        mb={below720 ? 1 : 3}
        p={3}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          if (below720) onOpen();
        }}
      >
        <Avatar
          src={`https://ui-avatars.com/api/?name=${doc.name}&background=random`}
        />
        <Box textAlign={"start"}>
          <Heading fontSize={["lg", "xl"]} textAlign={"start"}>
            {doc.name}
          </Heading>
          <Text>
            expertise {"\u2022"} {doc.lab.name}
          </Text>
        </Box>
      </HStack>
      {/* <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <LecturerView onClose={onClose} doc={doc} />
      </Slide> */}
    </>
  );
};

export default Item;
