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
            <StarIcon key={uuidv4()} textColor={"orange.400"} fontSize={"lg"} />
          );
        })}
      {Array(5 - total)
        .fill(0)
        .map(() => {
          return (
            <StarIcon key={uuidv4()} textColor={"orange.400"} fontSize={"lg"} />
          );
        })}
    </HStack>
  );
};

export default Stars;
