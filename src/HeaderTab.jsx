import { Tab, TabList, Tabs } from "@chakra-ui/react";

export default function HeaderTab() {
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
