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
import { useEffect, useRef } from "react";
import { BsFilterRight } from "react-icons/bs";
import TagList from "./TagList";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useBoundStore } from "./useBoundStore";
import { useQuery, gql } from "@apollo/client";

axios.defaults.withCredentials = true;

const GET_SUBJECTS_CHARACTERS = gql`
  query GET_SUBJECTS_CHARACTERS {
    subjects: subjects {
      id
      name
    }
    characters: characters {
      id
      name
    }
  }
`;
const MiniHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);
  const logout = useBoundStore((state) => state.logout);

  const { loading, data } = useQuery(GET_SUBJECTS_CHARACTERS, {
    onCompleted: (data) => {},

    onError: (error) => {},
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const { status, data } = await axios.post(
          "https://127.0.0.1:6060/verify",
          {
            code: tokenResponse.code,
          },
          { withCredentials: true }
        );
        console.log(`data google: `, data);
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
              <MenuGroup title={user?.email ?? "unknown"}>
                <MenuItem
                  onClick={async () => {
                    console.log("Oucch");
                    await axios.post("https://127.0.0.1:6060/logout", {
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
          <DrawerFilter isOpen={isOpen} onClose={onClose} data={data} />
        </Show>
      </Flex>
    </Box>
  );
};

export default MiniHeader;

function DrawerFilter({ onClose, isOpen, data }) {
  const btnRef = useRef();
  const setGender = useBoundStore((state) => state.setGender);
  const setSubjects = useBoundStore((state) => state.setSubjects);
  const setTraits = useBoundStore((state) => state.setTraits);
  const gender = useBoundStore((state) => state.gender);
  const subjects = useBoundStore((state) => state.subjects);
  const traits = useBoundStore((state) => state.traits);

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
            visibility={"hidden"}
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
              </Text>{" "}
              {data?.subjects !== undefined ? (
                <TagList
                  tags={data.subjects}
                  setter={(id) => {
                    if (subjects?.includes(id)) {
                      const result = subjects.filter((arg) => arg !== id);
                      setSubjects(result.length > 0 ? result : null);
                    } else {
                      setSubjects(subjects !== null ? [...subjects, id] : [id]);
                    }
                  }}
                  selected={subjects}
                />
              ) : (
                <>world class loading design..</>
              )}
            </Box>
            <Box>
              <Text fontWeight={"bold"} pl={1} pb={1} fontSize={["xs", "sm"]}>
                Tags
              </Text>
              {data?.characters !== undefined ? (
                <TagList
                  tags={data.characters}
                  setter={(id) => {
                    if (traits?.includes(id)) {
                      const result = traits.filter((arg) => arg !== id);
                      setTraits(result.length > 0 ? result : null);
                    } else {
                      setTraits(traits !== null ? [...traits, id] : [id]);
                    }
                  }}
                  selected={traits}
                />
              ) : (
                <>loading</>
              )}
            </Box>
            <Box>
              <Text fontWeight={"bold"} pl={1} pb={1} fontSize={["xs", "sm"]}>
                Gender
              </Text>
              <TagList
                tags={[
                  { id: 1, name: "male" },
                  { id: 2, name: "female" },
                ]}
                setter={(id) => {
                  if (gender !== null && gender.includes(id)) {
                    setGender(null);
                  } else {
                    setGender(id);
                  }
                }}
                selected={gender}
                radio={true}
              />
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
