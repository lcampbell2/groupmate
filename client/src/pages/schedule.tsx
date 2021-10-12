import { Box, Heading } from "@chakra-ui/layout";
import React from "react";

interface scheduleProps {}

export const Schedule: React.FC<scheduleProps> = ({}) => {
  return (
    <Box>
      <Heading textAlign='center'>My Schedule</Heading>
    </Box>
  );
};

export default Schedule;
