import { Box, Divider, Text, Flex } from "@chakra-ui/layout";
import React from "react";
import { FOOTER_HEIGHT } from "../constants";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      bg='shirtRed'
      position='absolute'
      bottom='0'
      w='100%'
      height={FOOTER_HEIGHT}
    >
      <Divider borderColor='gray.900' />
      <Flex px='8' py='4'>
        {/* <Text>Footer</Text> */}
      </Flex>
    </Box>
  );
};
