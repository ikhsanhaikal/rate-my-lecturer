import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Stack,
  Tag,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBoundStore } from ".";

// const GET_COURSES = gql``;

const ReviewModal = ({ isOpen, onClose, finalRef, addReview }) => {
  const [pickedTags, setPickedTags] = useState(new Set());
  const [hoverIdx, setHoverIdx] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");

  const tags = useBoundStore((state) => state.tags);

  useEffect(() => {
    setPickedTags(() => new Set());
    setSelectedStar(() => 0);
    setComment(null);
  }, [isOpen]);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your review of the lecturer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Comments</FormLabel>
              <Textarea
                placeholder="Class was very interactive and fun!"
                onChange={(ev) => setComment(ev.target.value)}
                value={comment}
              />
            </FormControl>
            <FormControl isRequired my="2">
              <FormLabel>Tags</FormLabel>
              <Select
                placeholder="Add tags"
                onChange={(ev) => {
                  if (ev.target.value !== "") {
                    setPickedTags((prev) => new Set(prev).add(ev.target.value));
                  }
                }}
              >
                {tags.map((tag) => (
                  <option key={tag.id}>{tag.name}</option>
                ))}
              </Select>
              <Stack direction="row" my="2">
                {[...pickedTags].map((tag) => {
                  return (
                    <Tag key={tag}>
                      {tag}
                      <TagCloseButton
                        onClick={() => {
                          setPickedTags(
                            new Set(
                              [...pickedTags].filter((value) => value !== tag)
                            )
                          );
                        }}
                      />
                    </Tag>
                  );
                })}
              </Stack>
            </FormControl>
            <FormControl isRequired my="2">
              <FormLabel>Class</FormLabel>
              <Select placeholder="Kelas yang diambil">
                <option>dasar pemrograman , 2020, genap</option>
                <option>struktur data, 2020, ganjil</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rate</FormLabel>
              <HStack>
                {[1, 2, 3, 4, 5].map((idx) => {
                  return (
                    <Box
                      key={idx}
                      onMouseEnter={() => {
                        setHoverIdx(idx);
                      }}
                      onMouseLeave={() => {
                        setHoverIdx(null);
                      }}
                      onClick={() => {
                        setSelectedStar(idx);
                      }}
                    >
                      <StarIcon
                        fontSize="2xl"
                        textColor={
                          idx <= (hoverIdx || selectedStar)
                            ? "orange.200"
                            : "gray.200"
                        }
                      />
                    </Box>
                  );
                })}
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addReview({ variables: { input: {} } });
              }}
            >
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
