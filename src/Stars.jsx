import { HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

const Stars = ({ total }) => {
  return (
    <HStack spacing={1}>
      {Array(total)
        .fill(0)
        .map(() => {
          return (
            <StarIcon key={uuidv4()} textColor={"red.400"} fontSize={"xs"} />
          );
        })}
      {Array(4 - total)
        .fill(0)
        .map(() => {
          return (
            <StarIcon key={uuidv4()} textColor={"gray.400"} fontSize={"xs"} />
          );
        })}
    </HStack>
  );
};

export default Stars;
