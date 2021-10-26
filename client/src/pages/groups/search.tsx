import { Box, Divider, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchCard } from "../../components/group/SearchCard";
import { usePublicGroupsQuery } from "../../generated/graphql";

interface searchProps {}

export const GroupSearch: React.FC<searchProps> = ({}) => {
  const [{ data, fetching, error }, _] = usePublicGroupsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  let groupList = null;
  if (fetching) {
    groupList = <Box>Loading...</Box>;
  }

  if (!data || error) {
    groupList = <Box>An error has occured</Box>;
  }

  const filteredList = data?.publicGroups?.filter((group) => {
    return group.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });

  groupList = filteredList?.map((group, idx) => {
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
      <Input
        placeholder='Search for groups'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {groupList}
    </Box>
  );
};

export default GroupSearch;
