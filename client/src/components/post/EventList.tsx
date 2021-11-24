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
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

interface EventListProps {
  groupId: number;
  events: Array<GroupEvent>;
  isAdmin: boolean;
  isOwner: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  groupId,
  events,
  isAdmin,
  isOwner,
}) => {
  const [_createEvent, createEvent] = useCreateEventMutation();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const toast = useToast();
  const [startTimeValue, setStartTimeValue] = useState(new Date());
  const [endTimeValue, setEndTimeValue] = useState(new Date());

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
            startTime={event.startTime}
            endTime={event.endTime}
            location={event.location}
            meetingLink={event.meetingLink}
          />
        </Box>
      );
    });
  }

  return (
    <Box px='2'>
      {(isAdmin || isOwner) && (
        <Box>
          <Button
            bg='shirtDark'
            textColor='gray.200'
            _hover={{ bg: "gray.700" }}
            my='2'
            onClick={() => setIsCreatingEvent(!isCreatingEvent)}
            w='100%'
          >
            New Event
          </Button>
          <Collapse in={isCreatingEvent}>
            <Box bg='shirtPink' px='2' py='1'>
              <Formik
                initialValues={{
                  groupId,
                  title: "",
                  description: "",
                  startTime: "",
                  endTime: "",
                  location: "",
                  meetingLink: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  values.startTime = startTimeValue.toISOString();
                  values.endTime = endTimeValue.toISOString();

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
                      placeholder='Event title'
                      onChange={handleChange}
                    />
                    <FormControl>
                      <FormLabel htmlFor='description'>Description</FormLabel>
                      <Textarea
                        placeholder='This event is awesome because...'
                        bg='shirtDark'
                        color='white'
                        name='description'
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Start Time:</FormLabel>
                      <DateTimePicker
                        bg='white'
                        name='startTime'
                        value={startTimeValue}
                        onChange={setStartTimeValue}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>End Time:</FormLabel>
                      <DateTimePicker
                        name='endTime'
                        value={endTimeValue}
                        onChange={setEndTimeValue}
                      />
                    </FormControl>

                    <InputField
                      placeholder='The event will take place at...'
                      name='location'
                      label='Location Name'
                      onChange={handleChange}
                    />
                    <InputField
                      placeholder='Zoom, Google Meet, MS Teams, etc.'
                      name='meetingLink'
                      label='Online Meeting Link'
                      onChange={handleChange}
                    />
                    <Button
                      bg='shirtDark'
                      textColor='gray.200'
                      _hover={{ bg: "gray.700" }}
                      my='2'
                      type='submit'
                    >
                      Create Event
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Collapse>
        </Box>
      )}
      {groupEvents}
    </Box>
  );
};
