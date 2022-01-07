import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { BsGithub } from "react-icons/bs";

const MiniHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"white"}
      px={4}
      py={2}
    >
      <Button
        bg={"white"}
        ref={btnRef}
        onClick={onOpen}
        _focus={{ outline: "none" }}
        _hover={{ boxShadow: "none" }}
        p={0}
      >
        <Icon as={HamburgerIcon} fontSize={"2xl"} />
      </Button>
      <Icon as={BsGithub} fontSize={"1.5rem"} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
        border="1px solid red"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader></DrawerHeader>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
