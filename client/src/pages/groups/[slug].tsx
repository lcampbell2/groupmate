import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface GroupDetailsProps {}

export const GroupDetails: React.FC<GroupDetailsProps> = ({}) => {
  return (
    <Box>
      <Heading textAlign='center'>Group Details</Heading>
    </Box>
  );
};

export default GroupDetails;
