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
  let navBarLinks = (
    <>
      <NextLink href='/'>
        <Link>Home</Link>
      </NextLink>
    </>
  );

  if (fetching) {
    authLinks = null;
  } else if (data?.me) {
    navBarLinks = (
      <>
        <NextLink href='/'>
          <Link>Home</Link>
        </NextLink>
        <NextLink href='/groups'>
          <Link>My Groups</Link>
        </NextLink>
        <NextLink href='/schedule'>
          <Link>My Schedule</Link>
        </NextLink>
        <NextLink href='/group-search'>
          <Link>Group Search</Link>
        </NextLink>
      </>
    );
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
        <Button onClick={() => router.push("/login")}>Sign in</Button>
        <Button onClick={() => router.push("/register")}>Create Account</Button>
        {/* <NextLink href='/login'>
          <Link>Sign In</Link>
        </NextLink> */}
        {/* <NextLink href='/register'>
          <Link>Create Account</Link>
        </NextLink> */}
      </>
    );
  }

  return (
    <Flex bg='gray.300' p='4'>
      <Stack isInline align='center' spacing={10}>
        {navBarLinks}
      </Stack>
      <Stack isInline ml='auto' align='center' spacing={4}>
        {authLinks}
      </Stack>
    </Flex>
  );
};
