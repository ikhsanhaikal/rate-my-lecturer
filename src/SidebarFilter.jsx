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
  const setGender = useBoundStore((state) => state.setGender);
  const setSubjects = useBoundStore((state) => state.setSubjects);
  const setTraits = useBoundStore((state) => state.setTraits);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error..</p>;
  }

  //console.log(`filter: `, data);
  return (
    <Box
      className="category-bar"
      //  w="250px"
      bg="#F1F3F4"
      rounded="md"
      paddingX="3"
      overflow="auto"
    >
      <CheckboxGroup
        colorScheme="green"
        onChange={(subject) => {
          //console.log("subject: ", subject);
          setSubjects(subject.length !== 0 ? subject : null);
        }}
      >
        <Box marginY={3}>
          <Text as="b">subjects</Text>
        </Box>
        <Stack direction="column">
          {data.subjects.map((subject) => (
            <Checkbox key={subject.id} value={`${subject.id}`}>
              {subject.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider orientation="horizontal" my="3" />
      <CheckboxGroup
        colorScheme="green"
        onChange={(value) => {
          setTraits(value.length !== 0 ? value : null);
        }}
      >
        <Box marginY={3}>
          <Text as="b">types</Text>
        </Box>
        <Stack direction="column">
          {data.characters.map((character) => (
            <Checkbox key={character.id} value={`${character.id}`}>
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
          setGender(value.length > 0 ? value[0] : null);
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
