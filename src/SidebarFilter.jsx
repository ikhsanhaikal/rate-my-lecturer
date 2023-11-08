import {
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function SidebarFilter() {
  return (
    <Box
      className="category-bar"
      w="250px"
      // bg="#F1F3F4"
      mr="10"
      paddingX="3"
      borderWidth="10"
      borderColor="red.100"
    >
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Box marginY={3}>
          <Text as="b">subjects</Text>
        </Box>
        <Stack direction="column">
          {[
            "linear algebra",
            "dasar pemrograman",
            "jaringan komputer",
            "sistem operasi",
            "data mining",
            "pemrograman berbasis objek",
          ].map((subject) => (
            <Checkbox key={subject} value={subject}>
              {subject}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider orientation="horizontal" my="3" />
      <CheckboxGroup colorScheme="green">
        <Box marginY={3}>
          <Text as="b">behaviors</Text>
        </Box>
        <Stack direction="column">
          {[
            "auto lulus",
            "auto ngulang",
            "santuy",
            "gaje",
            "bolosan",
            "tugasan",
            "presentasian",
            "killer",
          ].map((subject) => (
            <Checkbox key={subject} value={subject}>
              {subject}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider orientation="horizontal" my="3" />
      <CheckboxGroup colorScheme="green" defaultValue={[]}>
        <Box marginY={3}>
          <Text as="b">genders</Text>
        </Box>
        <Stack direction="column">
          {["female", "male"].map((subject) => (
            <Checkbox key={subject} value={subject}>
              {subject}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}
