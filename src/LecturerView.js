import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  Textarea,
  VStack,
  useControllableState,
} from "@chakra-ui/react";

import Comment from "./Comment";
import Stars from "./Stars";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";

const LecturerView = ({ onClose, doc }) => {
  const [textInput, setTextInput] = useControllableState("");
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const resp = await axios.get(
      `http://localhost:3001/comments?lecturerId=${doc.id}`
    );
    // console.log(`useEffect comments data `, resp.data);
    setComments(resp.data);
  }, []);

  return (
    <Box bgColor={"white"} width={"full"} h={"full"} overflowY={"scroll"}>
      <Box className="profile-image" bg={"gray.200"} h={["280px", "300px"]}>
        <Flex px={4} py={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={onClose}
            fontSize={"xl"}
            borderRadius={50}
          />
        </Flex>
      </Box>
      <Box display={"flex"} flexDir={"column"} px={6} py={4}>
        <Heading fontSize={"2xl"} textAlign={"start"}>
          {doc.name}
        </Heading>
        <Text textAlign={"start"} fontWeight={"semibold"}>
          expertise {"\u2022"} {doc.expertise}
        </Text>
        <Text textAlign={"start"} py={2} pr={2} fontSize={"base"}>
          {doc.description}
        </Text>
        <HStack spacing={"2.5"} justifyContent={"flex-start"} pb={4}>
          <Text fontSize={"sm"} textColor={"red.400"}>
            3.0
          </Text>
          <Stars total={3} />
        </HStack>
        <Box textAlign={"start"}>
          {doc.tags.map((label) => {
            return (
              <Tag key={label} m={0.5}>
                {label}
              </Tag>
            );
          })}
        </Box>
        <Divider py={2} />
        <Text
          textAlign={"start"}
          fontWeight={"semibold"}
          fontSize={["lg, xl"]}
          my={1}
          textColor={"teal"}
        >
          subjects
        </Text>
        <Box textAlign={"start"}>
          {doc.subjects.map((label) => {
            return (
              <Tag key={label} m={0.5}>
                {label}
              </Tag>
            );
          })}
        </Box>
        <Divider my={2} />
        <Box className="comments-container">
          <Text>Reviews ({comments.length})</Text>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                updateComment={null}
              />
            );
          })}
          <VStack textAlign={"start"} alignItems={"flex-end"} mt={10}>
            <Textarea
              placeholder="Write your comments here"
              borderRadius={"none"}
              bg={"white"}
              value={textInput}
              onChange={(e) => {
                setTextInput(e.currentTarget.value);
              }}
            />
            <Button
              borderRadius={"none"}
              mt={3}
              onClick={async () => {
                const newComment = {
                  name: "you",
                  body: textInput,
                  lecturerId: doc.id,
                };
                const resp = await axios.post(
                  `http://localhost:3001/comments`,
                  newComment
                );
                console.log(`comment post status: ${resp.status}`);
                console.log(resp.data);
                setComments([...comments, newComment]);
                setTextInput("");
              }}
            >
              Post
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerView;
