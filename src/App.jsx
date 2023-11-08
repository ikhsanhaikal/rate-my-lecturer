import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  Tabs,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import MiniSearch from "./MiniSearch";
import MiniHeader from "./MiniHeader";
import SearchBar from "./SearchBar";

import { useState } from "react";

import { Outlet } from "react-router-dom";
import SidebarFilter from "./SidebarFilter";

function App() {
  // const [lecturers, setLecturers] = useState(() => data.lecturers);
  const [onFocus, setOnFocus] = useState(false);
  const [below720] = useMediaQuery("(max-width: 720px)");
  return (
    <Box className="App">
      <Container maxW="container.lg">
        <>
          {onFocus ? (
            <MiniSearch setOnFocus={() => setOnFocus(false)} />
          ) : (
            <Flex
              // border="4px"
              // borderColor="red.200"
              flexDirection="column"
              // bgColor="#F1F3F4"
              minH="100vh"
            >
              <Box pb={5} mb={2}>
                <MiniHeader />
                <VStack
                  justifyContent="center"
                  alignItems="center"
                  bg="white"
                  h="full"
                >
                  <SearchBar setOnFocus={() => setOnFocus(true)} />
                  <CustomTab />
                </VStack>
              </Box>
              <Flex flexDirection="row">
                {below720 ? null : <SidebarFilter />}
                <Box flex="2">
                  <Outlet />
                </Box>
              </Flex>
            </Flex>
          )}
        </>
      </Container>
    </Box>
  );
}

export default App;

function CustomTab() {
  return (
    <Tabs
      w={"full"}
      align={"center"}
      bg={"#F1F3F4"}
      onChange={(id) => {
        console.log("id: ", id);
      }}
    >
      <TabList bgColor={"white"}>
        <Tab
          _focus={{ outline: "none" }}
          fontSize={["sm"]}
          fontWeight={"medium"}
        >
          All
        </Tab>
        <Tab
          _focus={{ outline: "none" }}
          fontSize={["sm"]}
          fontWeight={"medium"}
        >
          Most Picks
        </Tab>
        <Tab
          _focus={{ outline: "none" }}
          fontSize={["sm"]}
          fontWeight={"medium"}
        >
          Will ruin your semester
        </Tab>
      </TabList>
      {/* <TabPanels>
        <TabPanel p={0} bg={"#F1F3F4"}></TabPanel>
        <TabPanel p={0} bg={"#F1F3F4"}></TabPanel>
      </TabPanels> */}
    </Tabs>
  );
}
