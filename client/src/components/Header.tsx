import { Box, Divider } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box bg='gray.300'>
      <Text>Header</Text>
      <Divider borderBottomColor='gray.900' />
    </Box>
  );
};
