import { Box, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  eventTime: string;
  location?: string;
  meetingLink?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  eventTime,
  location,
  meetingLink,
}) => {
  const newDate = new Date(parseInt(eventTime));
  eventTime =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear() +
    " at " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes();

  return (
    <Box>
      <Stack isInline>
        <Text fontWeight='bold'>Title:</Text>
        <Text>{title}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Description:</Text>
        <Text>{description}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Date/Time:</Text>
        <Text>{eventTime}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Location:</Text>
        <Text>{location}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Online Meeting Link:</Text>
        <Link href={meetingLink} isExternal>
          {meetingLink}
        </Link>
      </Stack>
    </Box>
  );
};
