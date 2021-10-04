import { Heading, Stack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useQuery } from "urql";
import { EditableDisplayName } from "../components/user/EditableDisplayName";
import { EditablePassword } from "../components/user/EditablePassword";
import { EditableUserEmail } from "../components/user/EditableUserEmail";
import { ME } from "../graphql/queries";

interface userProps {}

export const User: React.FC<userProps> = ({}) => {
  // const router = useRouter();
  const [{ data }, me] = useQuery({ query: ME });
  // if (!data?.me) {
  //   router.push("/login");
  // }
  return (
    <Stack my='4'>
      <Heading textAlign='center' mb='4'>
        User Profile Page
      </Heading>

      <EditableUserEmail currentEmail={data?.me.email} userId={data?.me.id} />
      <EditableDisplayName
        currentDisplayName={data?.me.displayName}
        userId={data?.me.id}
      />
      <EditablePassword userId={data?.me.id} />
    </Stack>
  );
};

export default User;
