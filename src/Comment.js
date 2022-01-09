import { Avatar, Box, HStack, Icon, Text } from "@chakra-ui/react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

const Comment = ({ comment, setLecturers }) => {
  return (
    <Box className="comment">
      <HStack>
        <Avatar size={"sm"}></Avatar>
        <Text fontWeight={"medium"}>{comment.name}</Text>
      </HStack>
      {/* <Text className="title" textAlign={"start"} fontWeight={"bold"} py={1}>
        What is this? totally mehh
      </Text> */}
      <Text className="comment" textAlign={"start"} fontSize={"sm"} py={0}>
        {comment.body}
      </Text>
      <HStack justifyContent={"flex-end"}>
        <HStack>
          <Icon as={GoThumbsup} />
          <Text fontSize={"sm"}>0</Text>
        </HStack>
        <HStack>
          <Icon as={GoThumbsdown} />
          <Text fontSize={"sm"}>0</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Comment;
