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
  Show,
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { BsFilterRight } from "react-icons/bs";
import TagList from "./TagList";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useBoundStore } from "./useBoundStore";

axios.defaults.withCredentials = true;

const MiniHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);
  const logout = useBoundStore((state) => state.logout);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const { status, data } = await axios.post(
          "https://127.0.0.1:5050/verify",
          {
            code: tokenResponse.code,
          },
          { withCredentials: true }
        );
        console.log(data, status);
        console.log("call login");
        login(data);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    flow: "auth-code",
  });

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
        marginStart={0}
        // px={2}
      >
        <Menu>
          <MenuButton as={Button} margin={0} padding={0}>
            <Icon as={HamburgerIcon} fontSize={"xl"} />
          </MenuButton>
          <MenuList>
            {user === null ? (
              <MenuItem
                onClick={async () => {
                  googleLogin();
                }}
              >
                Sign In
              </MenuItem>
            ) : (
              <MenuGroup title={user.email}>
                <MenuItem
                  onClick={async () => {
                    console.log("Oucch");
                    await axios.post("https://127.0.0.1:5050/terminate", {
                      withCredentials: true,
                    });
                    logout();
                  }}
                >
                  sign out
                </MenuItem>
              </MenuGroup>
            )}
          </MenuList>
        </Menu>
        <Show breakpoint="(max-width: 720px)">
          <Icon as={BsFilterRight} fontSize={"3xl"} onClick={onOpen} />
          <DrawerFilter isOpen={isOpen} onClose={onClose} />
        </Show>
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
              <TagList tags={subjects} />
            </Box>
            <Box>
              <Text fontWeight={"bold"} pl={1} pb={1} fontSize={["xs", "sm"]}>
                Tags
              </Text>
              <TagList tags={tags} />
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
