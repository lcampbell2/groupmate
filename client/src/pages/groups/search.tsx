import { Box, Divider, Heading } from "@chakra-ui/layout";
import React from "react";
import { SearchCard } from "../../components/group/SearchCard";
import { usePublicGroupsQuery } from "../../generated/graphql";

interface searchProps {}

export const GroupSearch: React.FC<searchProps> = ({}) => {
  const [{ data, fetching, error }, _] = usePublicGroupsQuery();
  let groupList = null;
  if (fetching) {
    groupList = <Box>Loading...</Box>;
  }

  if (!data || error) {
    groupList = <Box>An error has occured</Box>;
  }

  groupList = data?.publicGroups?.map((group, idx) => {
    return (
      <Box key={idx}>
        <SearchCard
          groupId={group.id}
          name={group.name}
          description={group.description}
          visibility={group.visibility}
          users={group.users.length}
        />
        <Divider borderBottomColor='gray.900' />
      </Box>
    );
  });

  return (
    <Box>
      <Heading textAlign='center' mb='4'>
        Group Search
      </Heading>
      {groupList}
    </Box>
  );
};

export default GroupSearch;
