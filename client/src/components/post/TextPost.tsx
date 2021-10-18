import { Box, Stack, Text } from "@chakra-ui/layout";
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
  let replyList = null;
  if (!replies || replies?.length === 0) {
    replyList = (
      <Box>
        <Text fontWeight='bold'>No Replies</Text>
      </Box>
    );
  } else {
    replyList = replies.map((reply) => {
      return (
        <Box key={reply.id}>
          <Text>User: {reply.author.displayName}</Text>
          <Text>{reply.message}</Text>
        </Box>
      );
    });
  }
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
        <Text fontWeight='bold'>Date:</Text>
        <Text>{date}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Author:</Text>
        <Text>{authorName}</Text>
      </Stack>
      <Text fontWeight='bold'>Replies:</Text>
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
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField
              name='replyMessage'
              label='New Reply'
              onChange={handleChange}
            />
            <Button type='submit'>Reply</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
