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

const ReviewModal = ({ isOpen, onClose, finalRef }) => {
  const [tags, setTags] = useState(new Set());
  const [hoverIdx, setHoverIdx] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
  useEffect(() => {
    setTags(() => new Set());
    setSelectedStar(() => 0);
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
              <Textarea placeholder="Class was very interactive and fun!" />
            </FormControl>
            <FormControl isRequired my="2">
              <FormLabel>Tags</FormLabel>
              <Select
                placeholder="Add tags"
                onChange={(ev) => {
                  if (ev.target.value !== "") {
                    setTags((prev) => new Set(prev).add(ev.target.value));
                  }
                }}
              >
                <option>santuy</option>
                <option>auto lulus</option>
                <option>tugasan</option>
                <option>auto ngulang</option>
                <option>enak jelasinnya</option>
              </Select>
              <Stack direction="row" my="2">
                {[...tags].map((tag) => {
                  return (
                    <Tag key={tag}>
                      {tag}
                      <TagCloseButton
                        onClick={() => {
                          setTags(
                            new Set([...tags].filter((value) => value !== tag))
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
            <Button colorScheme="blue" mr={3}>
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
