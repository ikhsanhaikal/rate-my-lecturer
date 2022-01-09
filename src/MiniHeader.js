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
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";

const MiniHeader = ({ setFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [picks, setPicks] = useState(() => {
    const previousFilters = localStorage.getItem("filters");
    if (previousFilters === null) {
      return [];
    } else {
      return previousFilters.split(":");
    }
  });
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
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius={10}>
          <DrawerHeader>
            <Text>Filters</Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Text>Subjects</Text>
              <Box>
                {[
                  "jaringan komputer",
                  "dasar pemrograman",
                  "sistem basis data",
                  "matematika diskrit",
                  "aljabar linear",
                  "teori graf dan otomata",
                  "manajemen basis data",
                  "struktur data",
                ].map((subject) => {
                  return (
                    <Tag
                      m={0.5}
                      key={subject}
                      bg={picks.includes(subject) ? "green.300" : null}
                      textColor={picks.includes(subject) ? "white" : null}
                      onClick={(e) => {
                        if (picks.includes(subject)) {
                          setPicks(picks.filter((pick) => pick !== subject));
                        } else {
                          setPicks([...picks, subject]);
                        }
                      }}
                      cursor={"pointer"}
                    >
                      {subject}
                    </Tag>
                  );
                })}
              </Box>
            </VStack>
            {/* <VStack alignItems={"flex-start"}>
              <Text>Tags</Text>
              <Box>
                <Tag m={0.5}>tag1</Tag>
                <Tag m={0.5}>tag2</Tag>
                <Tag m={0.5}>tag3</Tag>
                <Tag m={0.5}>tag4</Tag>
                <Tag m={0.5}>tag5</Tag>
                <Tag m={0.5}>tag6</Tag>
              </Box>
            </VStack> */}
          </DrawerBody>
          <Button
            borderRadius={"50"}
            m={10}
            onClick={() => {
              setFilters(picks);
              onClose();
            }}
          >
            apply filters
          </Button>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MiniHeader;
