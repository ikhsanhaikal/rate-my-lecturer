import { ArrowBackIcon } from "@chakra-ui/icons";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  useControllableState,
  Input,
  useDisclosure,
  Textarea,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import Comment from "./Comment";
import Stars from "./Stars";
import { useEffect, useState } from "react";

const LecturerView = ({ onClose, doc }) => {
  const [textInput, setTextInput] = useControllableState("");
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onBlurFocus } = useDisclosure();

  return (
    <Box bgColor={"white"} width={"full"} h={"full"} overflowY={"scroll"}>
      <Box className="profile-image" bg={"gray.200"} h={["200px", "300px"]}>
        <Flex px={4} py={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={onClose}
            fontSize={"xl"}
            borderRadius={50}
          />
        </Flex>
      </Box>
      <Box display={"flex"} flexDir={"column"} py={4} w="full">
        <Box px={3}>
          <Heading fontSize={["larger", "xl", "2xl"]} textAlign={"start"}>
            {doc.name}
          </Heading>
          <Text textAlign={"start"} fontWeight={"semibold"}>
            expertise {"\u2022"} {doc.expertise}
          </Text>
          <Text
            textAlign={"start"}
            py={2}
            pr={2}
            fontSize={["sm", "md", "lg", "xl"]}
          >
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
        </Box>
        <Box>
          <Text textAlign={"start"} px={3}>
            Comments ({comments.length})
          </Text>
          <Flex alignItems="center" padding={3} columnGap={3}>
            <Avatar size={"xs"}></Avatar>
            <Input
              placeholder="Add a commment..."
              borderRadius={"none"}
              bg={"white"}
              value={textInput}
              size={["sm"]}
              onFocus={onOpen}
              onChange={(e) => {
                setTextInput(e.currentTarget.value);
              }}
            />
            <CommentOnFocus isOpen={isOpen} onBlurFocus={onBlurFocus} />
          </Flex>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                updateComment={null}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerView;

function CommentOnFocus({ isOpen, onBlurFocus }) {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(null);

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onBlurFocus}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Flex alignItems="center" paddingY={0}>
            <Flex alignItems="flex-start" w={"full"}>
              <Avatar size="sm" mt={1}></Avatar>
              <Textarea
                placeholder="Add a commment..."
                borderRadius={"none"}
                border={"none"}
                _focus={{ outline: "none" }}
                bg={"white"}
                resize="none"
                autoFocus={true}
                rows={rows}
                onChange={(e) => {
                  setText(e.target.value);
                  console.log("scrollHeight", e.currentTarget.scrollHeight);
                  console.log("clientHeight", e.currentTarget.clientHeight);
                  if (
                    e.currentTarget.scrollHeight > e.currentTarget.clientHeight
                  ) {
                    setRows(rows + 1);
                    setScrollHeight(e.currentTarget.clientHeight);
                  } else if (
                    e.currentTarget.scrollHeight < e.currentTarget.clientHeight
                  ) {
                    setRows(rows - 1);
                  }
                }}
              />
            </Flex>
            <Flex alignItems={"end"} h="full">
              <Button size={["xs", "sm"]} p={1}>
                Post
              </Button>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
