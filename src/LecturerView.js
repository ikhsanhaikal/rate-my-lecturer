import { ArrowBackIcon, StarIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";

import Comment from "./Comment";

const LecturerView = ({ onClose }) => {
  return (
    <Box bgColor={"white"} width={"full"} h={"full"} overflowY={"scroll"}>
      <Box className="profile-image" bg={"gray.200"} h={["300px", "400px"]}>
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
          apple
        </Heading>
        <Text textAlign={"start"} fontWeight={"semibold"}>
          expertise {"\u2022"} computer networking
        </Text>
        <Text textAlign={"start"} py={2} pr={2} fontSize={"base"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, enim?
          Accusantium ab soluta illo eaque accusamus commodi numquam quidem
          aliquid tenetur cumque nam, minus officia, ullam reprehenderit
          doloremque? Nisi, ut.
        </Text>
        <HStack spacing={"2.5"} justifyContent={"flex-start"} pb={4}>
          <Text fontSize={"sm"} textColor={"red.400"}>
            3.0
          </Text>
          <HStack spacing={1}>
            {Array(3)
              .fill(0)
              .map(() => {
                return <StarIcon textColor={"red.400"} fontSize={"xs"} />;
              })}
          </HStack>
        </HStack>
        <Box textAlign={"start"}>
          {["auto ngulang", "baperan", "jelasinnya enak", "tugas numpuk"].map(
            (label) => {
              return <Tag m={0.5}> {label} </Tag>;
            }
          )}
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
          {[
            "dasar pemrograman",
            "struktur data",
            "basis data terdistribusi",
            "pemrograman web",
            "big data",
            "jaringa komputer",
            "dasar pemrograman",
            "struktur data",
            "basis data terdistribusi",
            "pemrograman web",
            "big data",
            "jaringa komputer",
          ].map((label) => {
            return <Tag m={0.5}> {label} </Tag>;
          })}
        </Box>
        <Divider my={2} />
        <Box className="comments-container">
          <Text>Reviews (3)</Text>
          <Comment />
          <Comment />
          <Comment />
          <VStack textAlign={"start"} alignItems={"flex-end"} mt={10}>
            <Textarea
              placeholder="Write your comments here"
              borderRadius={"none"}
              bg={"#f2f2f2"}
            ></Textarea>
            <Button borderRadius={"none"} mt={3}>
              Post
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default LecturerView;
