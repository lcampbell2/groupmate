import { Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { useQuery } from "urql";
import { ME } from "../graphql/queries";

interface userProps {}

export const User: React.FC<userProps> = ({}) => {
  const [{ data }, me] = useQuery({ query: ME });
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>User Profile Page</Heading>
      <Text>{JSON.stringify(data)}</Text>
    </Stack>
  );
};

export default User;
