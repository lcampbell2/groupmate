import { Box, Divider, Text } from "@chakra-ui/layout";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bg='gray.300'>
      <Divider borderColor='gray.900' />
      <Text>Footer</Text>
    </Box>
  );
};
