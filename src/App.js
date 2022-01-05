import {
  Box,
  Container,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useMediaQuery,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import MiniHeader from "./MiniHeader";
import MiniSearch from "./MiniSearch";
import SearchBar from "./SearchBar";
import Item from "./Item";

function App() {
  const below500 = useMediaQuery(["(max-width: 800px)"]);
  const [isMiniSearchFocus, setIsMiniSearchFocus] = useState();
  return (
    <div className="App">
      {below500[0]
        ? [
            isMiniSearchFocus ? (
              <MiniSearch setIsMiniSearchFocus={setIsMiniSearchFocus} />
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
                          {Array(3)
                            .fill(0)
                            .map((n) => {
                              return <Item />;
                            })}
                        </TabPanel>
                        <TabPanel p={0} bg={"#F1F3F4"}>
                          {Array(2)
                            .fill(0)
                            .map((n) => {
                              return <Item />;
                            })}
                        </TabPanel>
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
