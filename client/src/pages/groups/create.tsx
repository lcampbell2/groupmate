import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface createProps {}

export const CreateOrganization: React.FC<createProps> = ({}) => {
  return (
    <Box>
      <Heading textAlign='center'>Create a Group</Heading>
    </Box>
  );
};

export default CreateOrganization;
