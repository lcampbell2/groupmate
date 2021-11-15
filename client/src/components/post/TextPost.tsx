import { Box, Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { PostReply, useCreateReplyMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface TextPostProps {
  id: number;
  title: string;
  description: string;
  date: string;
  authorName: string;
  replies: Array<PostReply> | undefined | null;
}

export const TextPost: React.FC<TextPostProps> = ({
  id,
  title,
  description,
  date,
  authorName,
  replies,
}) => {
  const [_, createReply] = useCreateReplyMutation();
  const toast = useToast();
  const newDate = new Date(parseInt(date));
  date =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear() +
    " at " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes();

  let replyList = null;
  if (replies?.length > 0) {
    replyList = replies.map((reply) => {
      return (
        <Stack isInline align='center' key={reply.id}>
          <Text fontWeight='bold'>{reply.author.displayName}:</Text>
          <Text>{reply.message}</Text>
        </Stack>
      );
    });
  }
  return (
    <Box>
      <Box bg='blue.200' p='2'>
        <Text fontSize='sm' as='u'>
          {authorName}, {date}
        </Text>
        <Text fontWeight='bold' fontSize='2xl'>
          {title}
        </Text>

        <Text fontSize='lg'>{description}</Text>
      </Box>
      <Divider borderBottomColor='gray.900' />
      <Box p='2'>
        {replyList}

        <Formik
          initialValues={{
            postId: id,
            replyMessage: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createReply(values);
            if (res?.data?.createReply.errors) {
              setErrors(toErrorMap(res.data.createReply.errors));
            } else if (res.data?.createReply.post) {
              toast({
                title: "Reply successfully created.",
                description: `createReply success`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              values.replyMessage = "";
            }
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Stack isInline align='center' mb='2'>
                <InputField
                  name='replyMessage'
                  onChange={handleChange}
                  placeholder='New reply'
                />
                <Button type='submit'>Reply</Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
