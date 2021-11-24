import React from "react";
import { Button } from "@chakra-ui/button";
import { Heading, Stack } from "@chakra-ui/layout";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const welcomeMessage = data?.me
    ? `Welcome back, ${data.me?.displayName}!`
    : "Welcome to Groupmate!";
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>{welcomeMessage}</Heading>
      <Button
        bg='shirtDark'
        textColor='gray.200'
        _hover={{ bg: "gray.700" }}
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
