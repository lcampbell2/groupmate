import { Flex, Link, Stack } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data }] = useMeQuery();
  let navBarLinks = (
    <>
      <NextLink href='/'>
        <Link>Home</Link>
      </NextLink>
    </>
  );

  if (data?.me) {
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
        <NextLink href='/groups/search'>
          <Link>Group Search</Link>
        </NextLink>
        <NextLink href='/user'>
          <Link>User Profile</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex bg='gray.200' px='8' py='4'>
      <Stack isInline align='center' spacing={10}>
        {navBarLinks}
      </Stack>
    </Flex>
  );
};
