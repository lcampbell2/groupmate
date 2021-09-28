import { Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const welcomeMessage = data?.me
    ? `Welcome back, ${data.me?.displayName}!`
    : "Welcome to Groupmate!";
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>{welcomeMessage}</Heading>
    </Stack>
  );
};
