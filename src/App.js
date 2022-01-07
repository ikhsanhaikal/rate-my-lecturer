import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import MiniHeader from "./MiniHeader";
import MiniSearch from "./MiniSearch";
import SearchBar from "./SearchBar";
import Item from "./Item";
import Data from "./db.json";

function App() {
  const below800 = useMediaQuery(["(max-width: 800px)"]);
  const [isMiniSearchFocus, setIsMiniSearchFocus] = useState();
  const [lecturers, setLecturers] = useState(Data.lecturers);
  return (
    <div className="App">
      {below800[0]
        ? [
            isMiniSearchFocus ? (
              <MiniSearch
                setIsMiniSearchFocus={setIsMiniSearchFocus}
                lecturers={lecturers}
              />
            ) : (
              <Flex
                p={0}
                maxWidth={"full"}
                flexDirection={"column"}
                minH={"100vh"}
                bg={"#F1F3F4"}
              >
                <Box pb={5} mb={2}>
                  <MiniHeader />
                  <VStack
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"white"}
                    h={"full"}
                  >
                    <SearchBar setIsMiniSearchFocus={setIsMiniSearchFocus} />
                    <Tabs w={"full"} align={"center"} bg={"#F1F3F4"}>
                      <TabList bgColor={"white"}>
                        <Tab _focus={{ outline: "none" }}>All</Tab>
                        <Tab _focus={{ outline: "none" }}>Most Picks</Tab>
                        <Tab _focus={{ outline: "none" }}>
                          Will ruin your semester
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={0} bg={"#F1F3F4"}>
                          {lecturers.map((lecturer) => {
                            return (
                              <Item
                                key={lecturer.name}
                                doc={lecturer}
                                lecturers={lecturers}
                                setLecturers={setLecturers}
                              />
                            );
                          })}
                        </TabPanel>
                        <TabPanel p={0} bg={"#F1F3F4"}></TabPanel>
                      </TabPanels>
                    </Tabs>
                  </VStack>
                </Box>
              </Flex>
            ),
          ]
        : "nope"}
    </div>
  );
}

export default App;
