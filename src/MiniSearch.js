import {
  Box,
  Container,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

const MiniSearch = () => {
  return (
    <Box h="full" px={4} py={4}>
      <InputGroup>
        <InputLeftElement
          onClick={() => {
            console.log("return home");
          }}
        >
          <Icon as={ArrowBackIcon} fontSize={"2xl"} color={"blue.600"} />
        </InputLeftElement>
        <Input
          border={"none"}
          borderRadius={0}
          borderBottom={"1px"}
          borderBottomColor={"gray.300"}
          _focus={{ outline: "none" }}
          size={"lg"}
          pb={2}
        />
      </InputGroup>
      <Spacer />
    </Box>
  );
};

export default MiniSearch;
