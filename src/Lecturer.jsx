import { ArrowBackIcon } from "@chakra-ui/icons";

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import Comment from "./Comment";
import Stars from "./Stars";
import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import data from "./db.json";
import { gql, useMutation, useQuery } from "@apollo/client";
import ReviewModal from "./ReviewModal";

import { useBoundStore } from ".";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function getLecturer(lecturerId) {
  const { lecturers } = data;
  const lecturer = lecturers.find(
    (lecturer) => lecturer.id === parseInt(lecturerId)
  );
  return lecturer;
}

export function loader({ params }) {
  const lecturer = getLecturer(params.lecturerId);
  return { lecturer };
}

const GET_LECTURER = gql`
  query GET_LECTURER($lecturerId: Int!) {
    lecturer(id: $lecturerId) {
      id
      name
      email
      lab {
        name
        code
      }
      tags {
        id
        name
      }
      subjects {
        id
        name
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation Mutation($input: reviewinput!) {
    reviewCreate(input: $input) {
      reviewer {
        username
        id
      }
      comment
      rate
      course {
        id
        subject {
          id
          name
        }
        year
        semester
      }
      tags {
        id
        name
      }
    }
  }
`;

const Lecturer = () => {
  const { lecturerId } = useParams();
  const { loading, error, data } = useQuery(GET_LECTURER, {
    variables: { lecturerId: parseInt(lecturerId) },
  });

  const [addReview, { dataReview, loadingAddReview, errorAddReview }] =
    useMutation(ADD_REVIEW);

  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);

  const inputCommentRef = React.useRef(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const { status, data } = await axios.post(
          "https://127.0.0.1:5050/verify",
          {
            code: tokenResponse.code,
          },
          { withCredentials: true }
        );
        console.log(data, status);
        console.log("call login");
        login(data);
      } catch (error) {
        onClose();
      }
    },
    onNonOAuthError: () => {
      onClose();
    },
    onError: (errorResponse) => {
      // console.log(errorResponse);
      onClose();
    },
    flow: "auth-code",
  });

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = React.useRef(null);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>error...</p>;
  }

  console.log(data);

  return (
    <Box bgColor="white" width="full" h="full" overflowY="scroll">
      <Box className="profile-image" bg={"gray.200"} h={["200px", "300px"]}>
        <Flex px={4} py={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            // onClick={onClose}
            onClick={() => {
              navigate(-1);
            }}
            fontSize={"xl"}
            borderRadius={50}
          />
        </Flex>
      </Box>
      <Box display="flex" flexDir="column" py="4" w="full">
        <Box px={3}>
          <Heading fontSize={["larger", "xl", "2xl"]} textAlign={"start"}>
            {data.lecturer.name}
          </Heading>
          <Text textAlign={"start"} fontWeight={"semibold"}>
            expertise {"\u2022"} {data.lecturer.lab.name}
          </Text>
          <Text
            textAlign={"start"}
            py={2}
            pr={2}
            fontSize={["sm", "md", "lg", "xl"]}
          ></Text>
          <HStack spacing={"2.5"} justifyContent={"flex-start"} pb={4}>
            <Stars total={3} />
          </HStack>
          <Box textAlign={"start"}>
            {data.lecturer.tags.map((tag) => {
              return (
                <Tag key={tag.id} m={0.5}>
                  {tag.name}
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
            {data.lecturer.subjects.map((subject) => {
              return (
                <Tag key={subject.id} m={0.5}>
                  {subject.name}
                </Tag>
              );
            })}
          </Box>
          <Divider my={2} />
        </Box>
        <Box>
          <Text textAlign={"start"} px={3}>
            {/* Comments ({comments.length}) */}
          </Text>
          <Flex alignItems="center" padding={3} columnGap={3} ref={finalRef}>
            <Avatar size={["xs", "sm"]}></Avatar>
            <Input
              placeholder="Add a commment..."
              borderRadius={"none"}
              bg={"white"}
              size={["sm", "md"]}
              onFocus={onOpen}
              ref={inputCommentRef}
            />
            {/* {user == null && isOpen ? (
              (function () {
                googleLogin();
                inputCommentRef.current.blur();
              })()
            ) : (
              <ReviewModal
                isOpen={isOpen}
                onClose={onClose}
                finalRef={finalRef}
                addReview={addReview}
              />
            )} */}
            <ReviewModal
              isOpen={isOpen}
              onClose={onClose}
              finalRef={finalRef}
              addReview={addReview}
            />
          </Flex>
          {/* {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                updateComment={null}
              />
            );
          })} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Lecturer;
