import { Box, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMyGroupsQuery } from "../../generated/graphql";
import { GroupCard } from "../../components/group/GroupCard";

interface indexProps {}

export const Groups: React.FC<indexProps> = ({}) => {
  const [{ data, fetching, error }, _] = useMyGroupsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  let groupList = null;

  if (fetching) {
    groupList = <Box>Loading...</Box>;
  } else if (error) {
    groupList = <Box>{JSON.stringify(error)}</Box>;
    console.error(error);
  } else {
    const filteredList = data?.myGroups?.filter(({ group }) => {
      return group.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

    if (filteredList.length === 0) {
      groupList = (
        <Box>
          <Text fontWeight='bold' textAlign='center' fontSize='xl'>
            No groups found!
          </Text>
        </Box>
      );
    } else {
      groupList = filteredList?.map(({ id, group, role }, idx) => {
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
    }
  }

  return (
    <Box>
      <Heading textAlign='center' mb='4'>
        My Groups
      </Heading>
      <Input
        color='white'
        bg='shirtDark'
        placeholder='Search for groups'
        onChange={(e) => setSearchTerm(e.target.value)}
        mb='2'
      />
      {groupList}
    </Box>
  );
};

export default Groups;
