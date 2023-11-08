import { Box, Tag } from "@chakra-ui/react";

export default function TagList({ tags }) {
  return (
    <Box>
      {tags.map((subject) => {
        return (
          <Tag
            m={0.5}
            p={2}
            key={subject}
            onClick={() => {}}
            cursor={"pointer"}
            fontSize={["xs", "sm"]}
          >
            {subject}
          </Tag>
        );
      })}
    </Box>
  );
}
