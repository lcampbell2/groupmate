import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useMeQuery, useMyGroupsQuery } from "../../generated/graphql";
import { GroupCard } from "../../components/group/GroupCard";

interface indexProps {}

export const Groups: React.FC<indexProps> = ({}) => {
  const [{ data: userData, fetching: loadingUser, error: userError }] =
    useMeQuery();
  const [{ data, fetching, error }, _] = useMyGroupsQuery({
    variables: { userId: userData?.me?.id as number },
  });
  let groupList = null;

  if (fetching || loadingUser) {
    groupList = <Box>Loading...</Box>;
  }

  if (error || userError) {
    groupList = <Box>{JSON.stringify(error)}</Box>;
    console.error(error);
  }

  groupList = data?.myGroups?.map(({ id, group, role }, idx) => {
    return (
      <GroupCard
        key={`${id}-${idx}`}
        name={group.name}
        description={group.description}
        role={role}
        slug={group.slug}
      />
    );
  });

  return (
    <Box>
      <Heading textAlign='center' mb='4'>
        My Groups
      </Heading>
      {groupList}
    </Box>
  );
};

export default Groups;
