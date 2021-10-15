import { Box, Stack, Text } from "@chakra-ui/layout";
import React from "react";

interface TextPostProps {
  title: string;
  description: string;
  date: string;
  authorName: string;
}

export const TextPost: React.FC<TextPostProps> = ({
  title,
  description,
  date,
  authorName,
}) => {
  return (
    <Box>
      <Stack isInline>
        <Text fontWeight='bold'>Title:</Text>
        <Text fontWeight='bold'>{title}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Description:</Text>
        <Text fontWeight='bold'>{description}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Date:</Text>
        <Text fontWeight='bold'>{date}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Author:</Text>
        <Text fontWeight='bold'>{authorName}</Text>
      </Stack>
    </Box>
  );
};
