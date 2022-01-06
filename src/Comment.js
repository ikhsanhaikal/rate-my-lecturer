import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

const Comment = ({ comment }) => {
  return (
    <Box className="comment">
      <HStack>
        <Avatar size={"sm"}></Avatar>
        <Text fontWeight={"medium"}>adrian</Text>
      </HStack>
      {/* <Text className="title" textAlign={"start"} fontWeight={"bold"} py={1}>
        What is this? totally mehh
      </Text> */}
      <Text
        className="comment"
        textAlign={"start"}
        fontSize={"sm"}
        py={0}
        px={[10]}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        itaque in perferendis adipisci nobis tempore molestias et exercitationem
        optio autem. Ullam culpa repellendus labore
      </Text>
      <HStack justifyContent={"flex-end"} px={10}>
        <HStack>
          <GoThumbsup />
          <Text fontSize={"sm"}>10</Text>
        </HStack>
        <HStack>
          <GoThumbsdown />
          <Text fontSize={"sm"}>6</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Comment;
