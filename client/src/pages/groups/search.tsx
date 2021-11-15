import { Box, Divider, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchCard } from "../../components/group/SearchCard";
import { useMeQuery, usePublicGroupsQuery } from "../../generated/graphql";

interface searchProps {}

export const GroupSearch: React.FC<searchProps> = ({}) => {
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const [{ data, fetching, error }] = usePublicGroupsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  let groupList = null;
  let joinedGroup = false;
  if (fetching || meFetching) {
    groupList = <Box>Loading...</Box>;
  } else if (!data || error) {
    groupList = <Box>An error has occured</Box>;
  } else {
    const currentUserId = meData.me.id;

    const filteredList = data?.publicGroups?.filter((group) => {
      return group.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

    groupList = filteredList?.map((group, idx) => {
      for (let i = 0; i < group.users.length; i++) {
        if (currentUserId === group.users[i].user.id) {
          joinedGroup = true;
        }
      }
      return (
        <Box key={idx}>
          <SearchCard
            groupId={group.id}
            name={group.name}
            description={group.description}
            visibility={group.visibility}
            users={group.users.length}
            joined={joinedGroup}
          />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }

  return (
    <Box>
      <Heading textAlign='center' mb='4'>
        Group Search
      </Heading>
      <Input
        placeholder='Search for groups'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {groupList}
    </Box>
  );
};

export default GroupSearch;
