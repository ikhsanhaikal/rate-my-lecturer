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
import { useEffect, useState } from "react";
import MiniHeader from "./MiniHeader";
import MiniSearch from "./MiniSearch";
import SearchBar from "./SearchBar";
import Item from "./Item";
import axios from "axios";

function App() {
  const below800 = useMediaQuery(["(max-width: 800px)"]);
  const [isMiniSearchFocus, setIsMiniSearchFocus] = useState();
  const [lecturers, setLecturers] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(async () => {
    const resp = await axios.get("http://localhost:3001/lecturers");
    setLecturers(resp.data);
  }, []);

  useEffect(async () => {
    console.log("filters: ", filters);
    if (filters.length !== 0) {
      console.log("whooo!:", filters);
      const filtered = lecturers.filter((lecturer) => {
        return filters.every((filter) => lecturer.subjects.includes(filter));
      });
      setFilteredResult(filtered);
      localStorage.setItem("filters", filters.join(":"));
    } else {
      localStorage.removeItem("filters");
    }
  }, [filters]);

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
                  <MiniHeader setFilters={setFilters} />
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
                          {filters.length === 0
                            ? lecturers.map((lecturer) => {
                                return (
                                  <Item
                                    key={lecturer.name}
                                    doc={lecturer}
                                    lecturers={lecturers}
                                    setLecturers={setLecturers}
                                  />
                                );
                              })
                            : filteredResult.map((lecturer) => {
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
