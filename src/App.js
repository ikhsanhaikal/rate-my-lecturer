import { Box, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import MiniHeader from "./MiniHeader";
import MiniSearch from "./MiniSearch";
import SearchBar from "./SearchBar";

function App() {
  const [below500] = useMediaQuery("(max-width: 500px)");
  const [isMiniSearchFocus, setIsMiniSearchFocus] = useState();
  return (
    <div className="App">
      {below500 ? (
        <>
          {/* <MiniHeader />
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            border={"1px solid red"}
          >
            <SearchBar />
          </Box> */}
          <MiniSearch />
        </>
      ) : (
        "nope"
      )}
    </div>
  );
}

export default App;
