import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import { InputField } from "../../components/InputField";
import { TextPost } from "../../components/post/TextPost";
import { UserCard } from "../../components/user/UserCard";
import {
  useGroupBySlugQuery,
  useCreatePostMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

export const GroupDetails: NextPage<{ slug: string }> = ({ slug }) => {
  const toast = useToast();
  const [_, createPost] = useCreatePostMutation();
  const [{ data, fetching, error }, _query] = useGroupBySlugQuery({
    variables: { slug: slug },
  });

  if (fetching) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    console.log(error);
  }

  const groupInfo = (
    <Box>
      <Stack isInline>
        <Text fontWeight='bold'>Name:</Text>
        <Text>{data?.groupBySlug?.name}</Text>
      </Stack>
      <Stack isInline>
        <Text fontWeight='bold'>Description:</Text>
        <Text>{data?.groupBySlug?.description}</Text>
      </Stack>
      <Divider borderBottomColor='gray.900' />
    </Box>
  );

  let userList = null;
  if (data?.groupBySlug?.users.length === 0) {
    <Box>
      <Text fontWeight='bold'>No users found</Text>
    </Box>;
  } else {
    userList = data?.groupBySlug?.users.map(({ user, role }, idx) => {
      return (
        <Box key={idx}>
          <UserCard displayName={user.displayName} role={role} />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }

  let groupPosts = null;
  if (data?.groupBySlug?.posts?.length === 0) {
    groupPosts = (
      <Box>
        <Text fontWeight='bold'>No posts found</Text>
      </Box>
    );
  } else {
    groupPosts = data?.groupBySlug?.posts?.map((post) => {
      return (
        <Box key={post.id}>
          <TextPost
            id={post.id}
            title={post.title}
            description={post.description}
            date={post.updatedAt}
            authorName={post.author.displayName}
            replies={post.replies}
          />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }

  return (
    <Box>
      <Heading textAlign='center'>Group Details</Heading>
      {/* {JSON.stringify(data)} */}
      {groupInfo}
      <Text>Users:</Text>
      {userList}
      <Box>
        <Text fontSize='lg' fontWeight='bold'>
          New Post:
        </Text>
        <Formik
          initialValues={{
            groupId: data?.groupBySlug?.id as number,
            title: "",
            description: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createPost(values);
            if (res?.data?.createPost.errors) {
              setErrors(toErrorMap(res.data.createPost.errors));
            } else if (res.data?.createPost.post) {
              toast({
                title: "Post successfully created.",
                description: `createPost success`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {({ handleChange }) => (
            <Form>
              <InputField name='title' label='Title' onChange={handleChange} />
              <FormControl>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Textarea name='description' onChange={handleChange} />
              </FormControl>
              <Button type='submit'>Create Post</Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Text>Posts:</Text>
      {groupPosts}
    </Box>
  );
};

GroupDetails.getInitialProps = ({ query }) => {
  return {
    slug: query.slug as string,
  };
};

export default GroupDetails;
