import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Post, useCreatePostMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";
import { TextPost } from "./TextPost";

interface PostListProps {
  groupId: number;
  posts: Array<Post>;
}

export const PostList: React.FC<PostListProps> = ({ groupId, posts }) => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const toast = useToast();
  const [_, createPost] = useCreatePostMutation();
  const comparePostDates = (a: Post, b: Post) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  };

  let groupPosts = null;
  if (posts?.length === 0) {
    groupPosts = (
      <Box>
        <Text fontWeight='bold'>No posts found</Text>
      </Box>
    );
  } else {
    const sortedPosts = posts.sort(comparePostDates).reverse();
    groupPosts = sortedPosts?.map((post) => {
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
    <Box bg='blue.100' px='2' py='1'>
      <Box my='2'>
        <Button onClick={() => setIsCreatingPost(!isCreatingPost)} mb='2'>
          New Post
        </Button>
        <Collapse in={isCreatingPost}>
          <Formik
            initialValues={{
              groupId,
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
                values.title = "";
                values.description = "";
                setIsCreatingPost(false);
              }
            }}
          >
            {({ handleChange }) => (
              <Form>
                <InputField
                  name='title'
                  label='Title'
                  onChange={handleChange}
                  placeholder='Post title'
                />
                <FormControl>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea
                    name='description'
                    onChange={handleChange}
                    placeholder='I am making this post because...'
                    mb='2'
                    bg='white'
                  />
                </FormControl>
                <Button type='submit'>Create Post</Button>
              </Form>
            )}
          </Formik>
        </Collapse>
      </Box>
      {groupPosts}
    </Box>
  );
};
