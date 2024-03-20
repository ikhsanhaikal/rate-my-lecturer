import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useBoundStore } from "./useBoundStore";

const GET_SUBJECTS_CHARACTERS = gql`
  query GET_SUBJECTS_CHARACTERS {
    subjects: subjects {
      id
      name
    }
    characters: characters {
      id
      name
    }
  }
`;

export default function SidebarFilter({ filter, setFilter }) {
  const { loading, error, data } = useQuery(GET_SUBJECTS_CHARACTERS);
  const initializeTags = useBoundStore((state) => state.initializeTags);

  useEffect(() => {
    initializeTags(data?.characters ?? []);
  }, [data, initializeTags]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error..</p>;
  }

  return (
    <Box
      className="category-bar"
      w="250px"
      bg="#F1F3F4"
      rounded="md"
      mr="10"
      paddingX="3"
      overflowY="auto"
    >
      <CheckboxGroup colorScheme="green">
        <Box marginY={3}>
          <Text as="b">subjects</Text>
        </Box>
        <Stack direction="column">
          {data.subjects.map((subject) => (
            <Checkbox key={subject.id} value={subject.name}>
              {subject.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider orientation="horizontal" my="3" />
      <CheckboxGroup colorScheme="green">
        <Box marginY={3}>
          <Text as="b">types</Text>
        </Box>
        <Stack direction="column">
          {data.characters.map((character) => (
            <Checkbox key={character.id} value={character.name}>
              {character.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider orientation="horizontal" my="3" />
      <CheckboxGroup
        colorScheme="green"
        onChange={(value) => {
          if (value.length === 2) {
            value.shift();
          }
          setFilter(() => ({
            gender: value,
          }));
        }}
      >
        <Box marginY={3}>
          <Text as="b">genders</Text>
        </Box>
        <Stack direction="column" marginBottom="3">
          {["female", "male"].map((subject) => (
            <Checkbox key={subject} value={subject.toUpperCase()}>
              {subject}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}
