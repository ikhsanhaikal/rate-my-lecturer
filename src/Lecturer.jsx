import { ArrowBackIcon } from "@chakra-ui/icons";

import {
  Avatar,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Box,
  Button,
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
import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import ReviewModal from "./ReviewModal";

import { useBoundStore } from "./useBoundStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { Rating } from "react-simple-star-rating";
const GET_LECTURER = gql`
  query GET_LECTURER($lecturerId: Int!) {
    lecturer(id: $lecturerId) {
      id
      name
      email
      lab {
        id
        name
      }
      tags {
        id
        name
      }
      rating
      subjects {
        id
        name
      }
      reviews {
        id
        reviewer {
          id
          username
          email
        }
        comment
        rating
        createdAt
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation ADD_REVIEW($reviewInput: ReviewInput!) {
    addReview(reviewInput: $reviewInput) {
      reviewer {
        username
        id
      }
      comment
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
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PROD_API;

const Lecturer = ({ doc }) => {
  const { lecturerId } = useParams();
  const { loading, error, data } = useQuery(GET_LECTURER, {
    variables: { lecturerId: parseInt(lecturerId ?? doc.id) },
  });
  const logout = useBoundStore((state) => state.logout);

  const alertProps = useDisclosure();
  const [addReview, result] = useMutation(ADD_REVIEW, {
    refetchQueries: [
      { query: GET_LECTURER, variables: { lecturerId: parseInt(lecturerId) } },
    ],
    onCompleted: () => {
      onClose();
    },
    onError: (error) => {
      if (
        error.graphQLErrors
          .map((err) => err.extensions.code)
          .find((code) => {
            return code === "FORBIDDEN";
          })
      ) {
        alertProps.onOpen();
      }
      // console.log("error general");
      // console.log("error: ", error);
    },
  });

  const user = useBoundStore((state) => state.user);
  const login = useBoundStore((state) => state.login);

  const inputCommentRef = React.useRef(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const { status, data } = await axios.post(
          `${BASE_URL}/verify`,
          {
            code: tokenResponse.code,
          },
          { withCredentials: true }
        );
        // console.log(data, status);
        // console.log("call login");
        login(data);
      } catch (error) {
        onClose();
      }
    },
    onNonOAuthError: (nonOAuthError) => {
      // console.log(`nonAuthOError: `, nonOAuthError);
      onClose();
    },
    onError: (errorResponse) => {
      // console.log(`onError: `, errorResponse);
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
    return <p>error...</p>;
  }

  return (
    <Box bgColor="white" width="full" h="full" overflowY="scroll">
      <AlertComponent disclosure={alertProps} logout={logout} />
      <Box className="profile-image" bg={"gray.200"} h={["200px", "300px"]}>
        <Flex px={4} py={4}>
          <IconButton
            icon={<ArrowBackIcon />}
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
            expertise {"\u2022"} {data.lecturer.lab?.name}
          </Text>
          <Text
            textAlign={"start"}
            py={2}
            pr={2}
            fontSize={["sm", "md", "lg", "xl"]}
          ></Text>
          <HStack spacing={"2.5"} justifyContent={"flex-start"} pb={4}>
            <Rating
              initialValue={data.lecturer.rating}
              size={30}
              readonly={true}
              allowFraction={true}
            />
          </HStack>
          <Box textAlign={"start"}>
            {data.lecturer.tags.length > 0
              ? data.lecturer.tags.map((tag) => {
                  return (
                    <Tag key={tag.id} m={0.5}>
                      {tag.name}
                    </Tag>
                  );
                })
              : "no tags yet"}
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
            Comments ({data.lecturer.reviews.length})
          </Text>
          <Flex alignItems="center" padding={3} columnGap={3} ref={finalRef}>
            <Avatar size={["xs", "sm"]}></Avatar>
            <Input
              placeholder="Add a commment..."
              borderRadius={"none"}
              bg={"white"}
              size={["sm", "md"]}
              onFocus={() => {
                console.log("hello, world");
                onOpen();
              }}
              ref={inputCommentRef}
            />
            {user == null && isOpen ? (
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
                lecturerId={data.lecturer.id}
              />
            )}
          </Flex>
          {data.lecturer.reviews.map((review) => {
            return <Comment key={review.id} review={review} />;
          })}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default Lecturer;

function AlertComponent({ disclosure, logout }) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={() => {
        logout();
        disclosure.onClose();
      }}
      isOpen={disclosure.isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Session has expired</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>please sign in again to continue</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            colorScheme="green"
            ml={3}
            onClick={() => {
              disclosure.onClose();
              logout();
            }}
          >
            Sign In
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
