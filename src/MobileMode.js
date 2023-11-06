import {
  Box,
  Flex,
  VStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import MiniHeader from "./MiniHeader";
import SearchBar from "./SearchBar";
import Item from "./Item";
import MiniSearch from "./MiniSearch";
import { useState } from "react";

import data from "./db.json";

export default function MobileMode() {
  const [lecturers, setLecturers] = useState(() => data.lecturers);
  const [onFocus, setOnFocus] = useState(false);
  return (
    <>
      {onFocus ? (
        <MiniSearch setOnFocus={() => setOnFocus(false)} />
      ) : (
        <Flex
          p={0}
          maxWidth={"full"}
          flexDirection={"column"}
          minH={"100vh"}
          bg={"#F1F3F4"}
        >
          <Box pb={5} mb={2} w="full" position={"fixed"}>
            <MiniHeader />
            <VStack
              justifyContent={"center"}
              alignItems={"center"}
              bg={"white"}
              h={"full"}
            >
              <SearchBar setOnFocus={() => setOnFocus(true)} />
              <CustomTab />
            </VStack>
          </Box>
          <Box my={5}>
            {lecturers.map((lecturer) => (
              <Item key={lecturer.id} doc={lecturer} />
            ))}
          </Box>
        </Flex>
      )}
    </>
  );
}

function CustomTab() {
  return (
    <Tabs
      w={"full"}
      align={"center"}
      bg={"#F1F3F4"}
      onChange={(id) => {
        console.log("id: ", id);
        // console.log("action object: ", filterBy(id));
        // dispatch(filterBy(id));
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
