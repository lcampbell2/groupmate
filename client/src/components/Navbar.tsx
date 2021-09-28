import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useMutation } from "urql";
import { LOGOUT } from "../graphql/mutations";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let authLinks = null;

  if (fetching) {
    authLinks = null;
  } else if (data?.me) {
    authLinks = (
      <>
        <NextLink href='/user'>
          <Link>{data.me?.displayName}</Link>
        </NextLink>
        <Button isLoading={logoutFetching} onClick={() => logout()}>
          Sign Out
        </Button>
      </>
    );
  } else {
    authLinks = (
      <>
        <NextLink href='/login'>
          <Link>Sign In</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Create Account</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex bg='gray.300' p='4'>
      <Stack isInline align='center'>
        <NextLink href='/'>
          <Link>Home</Link>
        </NextLink>
      </Stack>
      <Stack isInline ml='auto' align='center'>
        {authLinks}
      </Stack>
    </Flex>
  );
};
