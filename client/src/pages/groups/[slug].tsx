import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { TextPost } from "../../components/post/TextPost";
import { UserCard } from "../../components/user/UserCard";
import { useGroupBySlugQuery } from "../../generated/graphql";

export const GroupDetails: NextPage<{ slug: string }> = ({ slug }) => {
  const [{ data, fetching, error }, _] = useGroupBySlugQuery({
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
        <>
          <UserCard key={idx} displayName={user.displayName} role={role} />
          <Divider borderBottomColor='gray.900' />
        </>
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
        <>
          <TextPost
            key={post.id}
            title={post.title}
            description={post.description}
            date={post.updatedAt}
            authorName={post.author.displayName}
          />
          <Divider borderBottomColor='gray.900' />
        </>
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
