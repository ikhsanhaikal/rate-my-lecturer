import { Box, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBoundStore } from "./useBoundStore";

export default function TagList({ radio, tags, setter, selected }) {
  return (
    <Box>
      {tags.map((tag) => {
        return (
          <Tag
            m={0.5}
            p={2}
            key={tag.id}
            onClick={() => setter(radio ? tag.name.toUpperCase() : tag.id)}
            colorScheme={
              selected?.includes(radio ? tag.name.toUpperCase() : tag.id)
                ? "red"
                : null
            }
            cursor={"pointer"}
            fontSize={["xs", "sm"]}
          >
            {tag.name}
          </Tag>
        );
      })}
    </Box>
  );
}
