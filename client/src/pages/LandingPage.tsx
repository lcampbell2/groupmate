import { Button } from "@chakra-ui/button";
import { Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const welcomeMessage = data?.me
    ? `Welcome back, ${data.me?.displayName}!`
    : "Welcome to Groupmate!";
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>{welcomeMessage}</Heading>
      <Button
        onClick={() => {
          data?.me ? router.push("/groups/create") : router.push("/register");
        }}
      >
        Create Group
      </Button>
    </Stack>
  );
};
