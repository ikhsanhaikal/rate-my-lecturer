import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import MobileMode from "./MobileMode";
import DesktopMode from "./DesktopMode.";

function App() {
  const [below600] = useMediaQuery("(max-width: 650px)");
  return (
    <div className="App">{below600 ? <MobileMode /> : <DesktopMode />}</div>
  );
}

export default App;
