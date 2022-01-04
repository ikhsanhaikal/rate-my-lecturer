import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const MiniHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
    >
      <Button
        bg={"white"}
        ref={btnRef}
        onClick={onOpen}
        _focus={{ outline: "none" }}
        _hover={{ boxShadow: "none" }}
      >
        <Icon as={HamburgerIcon} fontSize={"2xl"} />
      </Button>
      <Button bg={"white"}>Sign in</Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textColor={"gray.800"}>Rating app</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"start"}>
              <Text
                fontWeight={"semibold"}
                textColor={"gray.800"}
                as={"button"}
                _focus={{ outline: "none" }}
              >
                Home
              </Text>
              <Text
                fontWeight={"semibold"}
                textColor={"gray.800"}
                as={"button"}
                _focus={{ outline: "none" }}
              >
                Most Pick
              </Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
