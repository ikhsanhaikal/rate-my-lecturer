import { Box, Container, Flex, Show, VStack } from "@chakra-ui/react";
import MiniSearch from "./MiniSearch";
import MiniHeader from "./MiniHeader";
import SearchBar from "./SearchBar";

import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import SidebarFilter from "./SidebarFilter";
import HeaderTab from "./HeaderTab";
import { useBoundStore } from ".";

function App() {
  const [onFocus, setOnFocus] = useState(false);
  const [filter, setFilter] = useState(() => ({ gender: [] }));
  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null) {
      login(currentUser);
    }
  }, [login]);

  useEffect(() => {
    console.log(`useEffect()`, user);
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
              <Flex flexDirection="row" maxH="2xl">
                <Show breakpoint="(min-width: 720px)">
                  <SidebarFilter filter={filter} setFilter={setFilter} />
                </Show>
                <Box flex="2" overflowY="auto">
                  <Outlet context={[filter]} />
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
