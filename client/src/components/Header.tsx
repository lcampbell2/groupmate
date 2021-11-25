import { Box, Divider, Flex, Link, Stack } from "@chakra-ui/layout";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let authLinks = null;

  if (fetching) {
    authLinks = null;
  } else if (data?.me) {
    authLinks = (
      <Button
        bg='shirtBlue'
        textColor='shirtDark'
        _hover={{ bg: "blue.400" }}
        isLoading={logoutFetching}
        onClick={() => {
          router.push("/");
          logout();
          toast({
            title: `Successfully signed out`,
            description: "You have been successfully been logged out",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        Sign Out
      </Button>
    );
  } else {
    authLinks = (
      <>
        <Button
          bg='shirtBlue'
          textColor='shirtDark'
          _hover={{ bg: "blue.400" }}
          onClick={() => router.push("/login")}
        >
          Sign in
        </Button>
        <Button
          bg='shirtBlue'
          textColor='shirtDark'
          _hover={{ bg: "blue.400" }}
          onClick={() => router.push("/register")}
        >
          Create Account
        </Button>
      </>
    );
  }

  return (
    <Box bg='shirtRed'>
      <Flex px='8' py='4'>
        <Heading>GroupMate</Heading>
        <Stack isInline ml='auto' align='center' spacing={4}>
          {authLinks}
        </Stack>
      </Flex>
      <Divider borderBottomColor='gray.900' />
    </Box>
  );
};
