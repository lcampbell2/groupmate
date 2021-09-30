import { Button, Flex, Link, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
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
        <Button
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
