import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Icon,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Flex,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { BsFilterRight } from "react-icons/bs";

const MiniHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"white"}
      px={4}
      py={2}
    >
      <Flex
        alignItems="center"
        justifyContent={"space-between"}
        w="full"
        pt={2}
        px={2}
      >
        <Icon as={HamburgerIcon} fontSize={"2xl"} />
        <Icon as={BsFilterRight} fontSize={"3xl"} onClick={onOpen} />
        <DrawerFilter isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export default MiniHeader;

function DrawerFilter({ onClose, isOpen }) {
  const btnRef = useRef();
  const tags = [
    "auto lulus",
    "auto ngulang",
    "santuy",
    "gaje",
    "bolosan",
    "tugasan",
    "presentasian",
    "killer",
  ];
  const subjects = [
    "linear algebra",
    "dasar pemrograman",
    "jaringan komputer",
    "sistem operasi",
    "data mining",
    "pemrograman berbasis objek",
  ];
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent borderTopRadius={20} onPointerMove={(e) => {}}>
        <DrawerHeader display="flex" justifyContent={"space-between"} pb={0}>
          <Button
            variant="ghost"
            _focus={{ boxShadow: "none" }}
            p={1}
            colorScheme={"blue"}
          >
            Apply
          </Button>
          <Text fontSize={"md"} m={2}>
            Filters
          </Text>
          <Button
            variant="ghost"
            _focus={{ boxShadow: "none" }}
            p={1}
            colorScheme={"blue"}
          >
            Clear
          </Button>
        </DrawerHeader>
        <DrawerBody>
          <VStack alignItems={"flex-start"}>
            <Box>
              <Text fontWeight={"bold"} pl={1} pb={1} fontSize={["xs", "sm"]}>
                Subjects
              </Text>
              <Tags tags={subjects} />
            </Box>
            <Box>
              <Text fontWeight={"bold"} pl={1} pb={1} fontSize={["xs", "sm"]}>
                Tags
              </Text>
              <Tags tags={tags} />
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function Tags({ tags }) {
  return (
    <Box>
      {tags.map((subject) => {
        return (
          <Tag
            m={0.5}
            p={2}
            key={subject}
            onClick={() => {}}
            cursor={"pointer"}
            fontSize={["xs", "sm"]}
          >
            {subject}
          </Tag>
        );
      })}
    </Box>
  );
}
