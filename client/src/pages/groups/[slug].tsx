import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
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
    </Box>
  );

  const userList = data?.groupBySlug?.users.map(({ user, role }, idx) => {
    return <UserCard key={idx} displayName={user.displayName} role={role} />;
  });

  const groupPosts = <Box>LIST OF GROUP POSTS</Box>;

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
