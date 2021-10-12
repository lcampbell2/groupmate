import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface GroupSearchProps {}

export const GroupSearch: React.FC<GroupSearchProps> = ({}) => {
  return (
    <Box>
      <Heading textAlign='center'>Group Search</Heading>
    </Box>
  );
};

export default GroupSearch;
