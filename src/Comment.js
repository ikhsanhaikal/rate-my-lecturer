import { Avatar, Box, HStack, Icon, Text } from "@chakra-ui/react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const Comment = ({ comment }) => {
  return (
    <Box className="comment" px={6} borderY={"1px"}>
      <HStack>
        <Avatar size={"sm"}></Avatar>
        <Text fontWeight={"medium"}>{comment.name}</Text>
      </HStack>
      <Text className="comment" textAlign={"start"} fontSize={"sm"} py={0}>
        {comment.body}
      </Text>
      <HStack justifyContent={"flex-end"}>
        <HStack>
          <Icon as={FiThumbsUp} />
          <Text fontSize={"sm"}>0</Text>
        </HStack>
        <HStack>
          <Icon as={FiThumbsDown} />
          <Text fontSize={"sm"}>0</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Comment;
