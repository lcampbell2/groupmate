import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingLink?: string;
  groupName?: string;
  groupSlug?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  startTime,
  endTime,
  location,
  meetingLink,
  groupName,
  groupSlug,
}) => {
  const router = useRouter();
  let newDate = new Date(parseInt(startTime));
  startTime =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear() +
    " at " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes();

  newDate = new Date(parseInt(endTime));
  endTime =
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
    <Box bg='shirtPink' px='2' py='1' mb='2'>
      {groupName && (
        <Button
          color='black'
          variant='link'
          onClick={() => router.push(`/groups/${groupSlug}`)}
        >
          {groupName}
        </Button>
      )}
      <Text fontSize='2xl' fontWeight='bold'>
        {title}
      </Text>
      <Text fontSize='lg'>{description}</Text>
      <Stack isInline>
        <Text fontWeight='bold'>When:</Text>
        <Text>
          {startTime} - {endTime}
        </Text>
      </Stack>
      {location && (
        <Stack isInline>
          <Text fontWeight='bold'>Where:</Text>
          <Text>{location}</Text>
        </Stack>
      )}
      {meetingLink && (
        <Stack isInline>
          <Text fontWeight='bold'>Online Meeting Link:</Text>
          <Link href={meetingLink} isExternal>
            {meetingLink}
          </Link>
        </Stack>
      )}
    </Box>
  );
};
