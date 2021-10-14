import { Flex, Box, Stack, Text } from "@chakra-ui/layout";
import React from "react";

interface UserCardProps {
  displayName: string;
  role: string;
}

export const UserCard: React.FC<UserCardProps> = ({ displayName, role }) => {
  return (
    <Flex
      width='100%'
      //   direction={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent='space-around'
      p='4'
    >
      <Box>
        <Stack isInline align='center'>
          <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
            {displayName}
          </Text>
        </Stack>
      </Box>
      <Box
        // flexBasis={{ md: "7em" }}
        mr={{ md: "1em" }}
        // minWidth={{ md: "2em" }}
        align='center'
      >
        <Text fontWeight='semibold'>{role.toUpperCase()}</Text>
      </Box>
    </Flex>
  );
};
