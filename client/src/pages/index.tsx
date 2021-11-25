import React from "react";
import { Button } from "@chakra-ui/button";
import { Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const welcomeMessage = data?.me
    ? `Welcome back, ${data.me?.displayName}!`
    : "Welcome to GroupMate!";
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>{welcomeMessage}</Heading>
      <Text textAlign='center' fontSize='xl'>
        A pragmatic social medium to find and organize groups while keeping
        track of your personal schedule. After registering with us, you can
        search for public groups and join in on posts and upcoming events, or
        even start your own group.
      </Text>
      <Text fontWeight='bold' fontSize='xl'>
        Become a Groupmate today!
      </Text>
      <Divider borderColor='shirtDark' />
      <Button
        bg='shirtBlue'
        textColor='shirtDark'
        _hover={{ bg: "blue.400" }}
        onClick={() => {
          data?.me ? router.push("/groups/create") : router.push("/register");
        }}
      >
        Create Group
      </Button>
    </Stack>
  );
};

export default Index;
