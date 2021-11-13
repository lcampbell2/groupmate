import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { GroupEvent, useCreateEventMutation } from "../../generated/graphql";
import { compareEventDates } from "../../utils/compareEventDates";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";
import { EventCard } from "./EventCard";

interface EventListProps {
  groupId: number;
  events: Array<GroupEvent>;
}

export const EventList: React.FC<EventListProps> = ({ groupId, events }) => {
  const [_createEvent, createEvent] = useCreateEventMutation();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const toast = useToast();

  let groupEvents = null;
  if (events?.length === 0) {
    groupEvents = (
      <Box>
        <Text fontWeight='bold'>No events found</Text>
      </Box>
    );
  } else {
    const sortedEvents = events?.sort(compareEventDates);
    groupEvents = sortedEvents?.map((event) => {
      return (
        <Box key={event.id}>
          <EventCard
            id={event.id}
            title={event.title}
            description={event.description}
            eventTime={event.eventTime}
            location={event.location}
            meetingLink={event.meetingLink}
          />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }
  return (
    <Box>
      <Box>
        <Button onClick={() => setIsCreatingEvent(!isCreatingEvent)}>
          New Event
        </Button>
        <Collapse in={isCreatingEvent}>
          <Formik
            initialValues={{
              groupId,
              title: "",
              description: "",
              eventTime: new Date().toISOString(),
              location: "",
              meetingLink: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await createEvent(values);
              console.log("res: ", res);
              if (res?.data?.createEvent.errors) {
                setErrors(toErrorMap(res.data.createEvent.errors));
              } else if (res.data?.createEvent.event) {
                toast({
                  title: "Event successfully created.",
                  description: `createEvent success`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                values.title = "";
                values.description = "";
                setIsCreatingEvent(false);
              }
            }}
          >
            {({ handleChange }) => (
              <Form>
                <InputField
                  name='title'
                  label='Title'
                  onChange={handleChange}
                />
                <FormControl>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea name='description' onChange={handleChange} />
                </FormControl>

                {/* <InputField
                  name='eventTime'
                  label='Date/Time'
                  onChange={handleChange}
                /> */}
                {/* <DateTimePicker onChange={setDateValue} value={dateValue} /> */}

                <InputField
                  name='location'
                  label='Location Name'
                  onChange={handleChange}
                />
                {/* <InputField
                  name='location.address'
                  label='Address'
                  onChange={handleChange}
                />
                <InputField
                  name='location.city'
                  label='City'
                  onChange={handleChange}
                />
                <InputField
                  name='location.region'
                  label='Province/State'
                  onChange={handleChange}
                />
                <InputField
                  name='location.Country'
                  label='Country'
                  onChange={handleChange}
                />
                <InputField
                  name='location.postalCode'
                  label='Postal Code'
                  onChange={handleChange}
                /> */}
                <InputField
                  name='meetingLink'
                  label='Online Meeting Link'
                  onChange={handleChange}
                />
                <Button type='submit'>Create Event</Button>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Box>
      <Text>Events:</Text>
      {groupEvents}
    </Box>
  );
};
