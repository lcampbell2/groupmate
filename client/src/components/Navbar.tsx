import { Box, Text, Divider } from "@chakra-ui/react";
import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Box bg='gray.300'>
      <Text> Navbar</Text>
      <Divider borderBottomColor='gray.900' />
    </Box>
  );
};
