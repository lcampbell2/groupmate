import { Button } from "@chakra-ui/button";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const router = useRouter();
  return (
    <Stack align='center' my='4'>
      <Heading textAlign='center'>Welcome to Groupmate!</Heading>
      <Text></Text>
      <Stack isInline>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Register</Button>
      </Stack>
    </Stack>
  );
};
