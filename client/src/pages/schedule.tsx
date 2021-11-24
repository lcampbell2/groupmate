import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { EventCard } from "../components/post/EventCard";
import { useMyEventsQuery } from "../generated/graphql";
import { compareEventDates } from "../utils/compareEventDates";

interface scheduleProps {}

export const Schedule: React.FC<scheduleProps> = ({}) => {
  const [{ data, fetching, error }, _] = useMyEventsQuery();
  let eventList = null;
  if (fetching) {
    eventList = (
      <Box>
        <Text fontWeight='bold'>Loading...</Text>
      </Box>
    );
  }
  if (error) {
    console.log(error);
  }

  if (data?.myEvents.length === 0) {
    eventList = (
      <Box>
        <Text fontWeight='bold'>No events found</Text>
      </Box>
    );
  } else {
    const sortedEvents = data?.myEvents?.sort(compareEventDates);
    eventList = sortedEvents?.map((event) => {
      return (
        <Box key={event.id}>
          <EventCard
            id={event.id}
            title={event.title}
            description={event.description}
            startTime={event.startTime}
            endTime={event.endTime}
            location={event.location}
            meetingLink={event.meetingLink}
            groupName={event.group.name}
            groupSlug={event.group.slug}
          />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }
  return (
    <Box>
      <Heading textAlign='center' mb='2'>
        My Schedule
      </Heading>
      {eventList}
    </Box>
  );
};

export default Schedule;
