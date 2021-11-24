import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/dist/client/router";

interface GroupCardProps {
  name: string;
  description: string;
  role: string;
  slug: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  name,
  description,
  role,
  slug,
}) => {
  const router = useRouter();
  return (
    <Flex
      width='100%'
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent='space-around'
      _hover={{ md: { bg: ["", "blue.300"] } }}
      p='4'
      as='button'
      onClick={() => {
        router.push(`/groups/${slug}`);
      }}
    >
      <Stack isInline align='center'>
        <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
          {name}
        </Text>
      </Stack>
      <Box mr={{ md: "1em" }} align='center'>
        <Text fontWeight='semibold'>{description}</Text>
      </Box>
    </Flex>
  );
};
