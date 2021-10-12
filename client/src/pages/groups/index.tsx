import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface indexProps {}

export const Groups: React.FC<indexProps> = ({}) => {
  return (
    <Box>
      <Heading textAlign='center'>My Groups</Heading>
    </Box>
  );
};

export default Groups;
