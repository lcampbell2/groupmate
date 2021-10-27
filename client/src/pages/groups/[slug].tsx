import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
  useIsUserAdminQuery,
  useIsUserOwnerQuery,
  useInviteUserToGroupMutation,
  useDismissInviteRequestMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

export const GroupDetails: NextPage<{ slug: string }> = ({ slug }) => {
  const toast = useToast();
  const [_, createPost] = useCreatePostMutation();
  const [_invite, inviteUser] = useInviteUserToGroupMutation();
  const [_dismiss, dismissRequest] = useDismissInviteRequestMutation();
  const [{ data, fetching, error }, _query] = useGroupBySlugQuery({
    variables: { slug },
  });
  const [isUserAdmin, _admin] = useIsUserAdminQuery({
    variables: { groupId: data?.groupBySlug?.id as number },
  });
  const [isUserOwner, _owner] = useIsUserOwnerQuery({
    variables: { groupId: data?.groupBySlug?.id as number },
  });

  if (fetching) {
    return <Box>Loading...</Box>;
  }

  const isAdmin = isUserAdmin.data?.isUserAdmin;
  const isOwner = isUserOwner.data?.isUserOwner;

  const handleInviteUser = async (
    email: string,
    groupId: number,
    role: string
  ) => {
    const res = await inviteUser({
      email,
      groupId,
      role,
    });
    if (res.data?.inviteUserToGroup.status) {
      toast({
        title: "User invited to group",
        description: `inviteUserToGroup success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invite failed",
        description: `inviteUserToGroup error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleInviteDismiss = async (groupId: number, userId: number) => {
    const res = await dismissRequest({
      groupId,
      userId,
    });
    if (res.data?.dismissInviteRequest.status) {
      toast({
        title: "Request Dismissed",
        description: `dismissInviteRequest success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Dismissal failed",
        description: `dismissInviteRequest error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
    userList = (
      <Box>
        <Text fontWeight='bold'>No users found</Text>
      </Box>
    );
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

  let inviteRequests = null;
  if (data?.groupBySlug?.inviteRequests?.length === 0) {
    inviteRequests = (
      <Box>
        <Text fontWeight='bold'>No requests found</Text>
      </Box>
    );
  } else {
    inviteRequests = data?.groupBySlug?.inviteRequests?.map((request, idx) => {
      return (
        <Flex key={idx}>
          {request.email}
          {request.displayName}
          <Button
            onClick={() => {
              handleInviteUser(
                request.email,
                data.groupBySlug?.id as number,
                "read"
              );
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              handleInviteDismiss(data.groupBySlug?.id as number, request.id);
            }}
          >
            Dismiss
          </Button>
        </Flex>
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
      {isOwner ? <Text>YOU ARE OWNER</Text> : <Text>NOT OWNER</Text>}
      {isAdmin ? <Text>YOU ARE ADMIN</Text> : <Text>NOT ADMIN</Text>}
      {groupInfo}
      {/* <Text>Users:</Text> */}
      <Box>
        <Formik
          initialValues={{ email: "", role: "read" }}
          onSubmit={async (values) => {
            // window.alert(JSON.stringify(values));
            handleInviteUser(
              values.email,
              data?.groupBySlug?.id as number,
              values.role
            );
          }}
        >
          {({ handleChange }) => (
            <Form>
              <InputField
                name='email'
                placeholder='Invite user by email'
                label='User List'
                onChange={handleChange}
              />
              {(isAdmin || isOwner) && (
                <>
                  <Select name='role' onChange={handleChange}>
                    <option value='read'>READ</option>
                    <option value='write'>WRITE</option>
                    <option value='admin'>ADMIN</option>
                  </Select>
                  <Button type='submit'>Invite User</Button>
                </>
              )}
            </Form>
          )}
        </Formik>
        <Divider borderBottomColor='gray.900' />
      </Box>
      {userList}
      {(isAdmin || isOwner) && inviteRequests}
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
