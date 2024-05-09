import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
const Comment = ({ review }) => {
  return (
    <Box className="comment" px={12} my={2}>
      <HStack>
        <Avatar size={"sm"}></Avatar>
        <Text fontWeight={"medium"}>{review.reviewer.username}</Text>
      </HStack>
      <Text fontSize={"sm"}>
        Reviewed on {new Date(review.createdAt).toLocaleDateString()}
      </Text>
      <HStack>
        <Rating
          initialValue={review.rating}
          size={20}
          readonly={true}
          allowFraction={true}
        />
        <Text className="comment" textAlign={"start"} py={0}>
          {review.comment}
        </Text>
      </HStack>
      <HStack justifyContent={"flex-end"}></HStack>
    </Box>
  );
};

export default Comment;
