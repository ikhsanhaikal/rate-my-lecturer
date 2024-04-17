import { Box, Container, Flex, VStack, useMediaQuery } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import MiniSearch from "./MiniSearch";
import MiniHeader from "./MiniHeader";
import SearchBar from "./SearchBar";

import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import SidebarFilter from "./SidebarFilter";
import HeaderTab from "./HeaderTab";
import { useBoundStore } from "./useBoundStore";

function App() {
  const [onFocus, setOnFocus] = useState(false);
  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);

  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null) {
      login(currentUser);
    }
  }, [login]);

  useEffect(() => {
    //console.log(`useEffect()`, user);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  return (
    <Box className="App">
      <Container maxW="container.lg">
        <>
          {onFocus ? (
            <MiniSearch setOnFocus={() => setOnFocus(false)} />
          ) : (
            <Flex flexDirection="column" minH="100vh">
              <Box pb={5} mb={2}>
                <MiniHeader />
                <VStack
                  justifyContent="center"
                  alignItems="center"
                  bg="white"
                  h="full"
                >
                  <SearchBar setOnFocus={() => setOnFocus(true)} />
                  <HeaderTab />
                </VStack>
              </Box>
              <Grid
                //maxH={"2xl"}
                //overflow={"auto"}
                templateColumns="repeat(16, 1fr)"
                gap={4}
              >
                {isLargerThan720 ? (
                  <GridItem
                    colSpan={4}
                    maxH={"2xl"}
                    overflow={"auto"}
                    //bg="tomato"
                  >
                    <SidebarFilter />
                  </GridItem>
                ) : null}
                <GridItem
                  id="scrollableGridItem"
                  colSpan={isLargerThan720 ? 12 : 16}
                  overflow={"auto"}
                  height={"fit-content"}
                  maxH={"2xl"}
                  //bg="papayawhip"
                >
                  <Outlet />
                </GridItem>
              </Grid>
            </Flex>
          )}
        </>
      </Container>
    </Box>
  );
}

export default App;
