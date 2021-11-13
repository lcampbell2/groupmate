import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import {
  GroupUser,
  useDismissInviteRequestMutation,
  useInviteUserToGroupMutation,
  User,
} from "../../generated/graphql";
import { InputField } from "../InputField";
import { UserCard } from "./UserCard";

interface UserListProps {
  groupId: number;
  users: Array<GroupUser>;
  inviteRequests: Array<User>;
  isAdmin: boolean;
  isOwner: boolean;
}

export const UserList: React.FC<UserListProps> = ({
  groupId,
  users,
  inviteRequests,
  isAdmin,
  isOwner,
}) => {
  const toast = useToast();
  const [_invite, inviteUser] = useInviteUserToGroupMutation();
  const [_dismiss, dismissRequest] = useDismissInviteRequestMutation();

  const handleInviteUser = async (
    email: string,
    groupId: number,
    role: string
  ) => {
    const res = await inviteUser({
      email,
      groupId,
      role,
    });
    if (res.data?.inviteUserToGroup.status) {
      toast({
        title: "User invited to group",
        description: `inviteUserToGroup success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invite failed",
        description: `inviteUserToGroup error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleInviteDismiss = async (groupId: number, userId: number) => {
    const res = await dismissRequest({
      groupId,
      userId,
    });
    if (res.data?.dismissInviteRequest.status) {
      toast({
        title: "Request Dismissed",
        description: `dismissInviteRequest success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Dismissal failed",
        description: `dismissInviteRequest error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  let userList = null;
  if (users.length === 0) {
    userList = (
      <Box>
        <Text fontWeight='bold'>No users found</Text>
      </Box>
    );
  } else {
    userList = users.map(({ user, role }, idx) => {
      return (
        <Box key={idx}>
          <UserCard
            userId={user.id}
            groupId={groupId}
            displayName={user.displayName}
            role={role}
            isAdmin={isAdmin}
            isOwner={isOwner}
          />
          <Divider borderBottomColor='gray.900' />
        </Box>
      );
    });
  }

  let inviteRequestsList = null;
  if (inviteRequests?.length === 0) {
    inviteRequestsList = (
      <Box>
        <Text fontWeight='bold'>No requests found</Text>
      </Box>
    );
  } else {
    inviteRequestsList = inviteRequests?.map((request, idx) => {
      return (
        <Flex key={idx}>
          {request.email}
          {request.displayName}
          <Button
            onClick={() => {
              handleInviteUser(request.email, groupId, "read");
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              handleInviteDismiss(groupId, request.id);
            }}
          >
            Dismiss
          </Button>
        </Flex>
      );
    });
  }

  return (
    <Box>
      <Formik
        initialValues={{ email: "", role: "read" }}
        onSubmit={async (values) => {
          handleInviteUser(values.email, groupId, values.role);
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField
              name='email'
              placeholder='Invite user by email'
              label='User List'
              onChange={handleChange}
            />
            {(isAdmin || isOwner) && (
              <>
                <Select name='role' onChange={handleChange}>
                  <option value='read'>READ</option>
                  <option value='write'>WRITE</option>
                  <option value='admin'>ADMIN</option>
                </Select>
                <Button type='submit'>Invite User</Button>
              </>
            )}
          </Form>
        )}
      </Formik>
      <Divider borderBottomColor='gray.900' />
      {userList}
      {(isAdmin || isOwner) && inviteRequestsList}
    </Box>
  );
};
