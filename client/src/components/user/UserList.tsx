import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
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
  const [showUserList, setShowUserList] = useState(false);

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
        <Flex
          key={idx}
          width='100%'
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent='space-between'
          p='4'
          bg='shirtRed'
          borderWidth='2px'
          borderColor='shirtPink'
          textColor='shirtDark'
        >
          <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
            {request.email} - {request.displayName}
          </Text>
          <Stack isInline>
            <Button
              bg='shirtBlue'
              textColor='shirtDark'
              _hover={{ bg: "blue.400" }}
              onClick={() => {
                handleInviteUser(request.email, groupId, "read");
              }}
            >
              Accept
            </Button>
            <Button
              bg='shirtBlue'
              textColor='shirtDark'
              _hover={{ bg: "blue.400" }}
              onClick={() => {
                handleInviteDismiss(groupId, request.id);
              }}
            >
              Dismiss
            </Button>
          </Stack>
        </Flex>
      );
    });
  }

  return (
    <Box px='2'>
      <Button
        bg='shirtBlue'
        textColor='shirtDark'
        _hover={{ bg: "blue.400" }}
        w='100%'
        my='2'
        onClick={() => {
          setShowUserList(!showUserList);
        }}
      >
        User List
      </Button>
      <Collapse in={showUserList}>
        <Box px='2' py='1' borderWidth='1px' borderColor='shirtBlue'>
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
                  onChange={handleChange}
                />
                {(isAdmin || isOwner) && (
                  <Stack isInline justifyContent='space-between' my='2'>
                    <Select
                      bg='shirtDark'
                      color='gray.500'
                      name='role'
                      onChange={handleChange}
                      w='25%'
                    >
                      <option value='read'>READ</option>
                      <option value='write'>WRITE</option>
                      <option value='admin'>ADMIN</option>
                    </Select>
                    <Button
                      bg='shirtBlue'
                      textColor='shirtDark'
                      _hover={{ bg: "blue.400" }}
                      type='submit'
                    >
                      Invite User
                    </Button>
                  </Stack>
                )}
              </Form>
            )}
          </Formik>
          <Divider borderBottomColor='gray.900' />
          {userList}
          {(isAdmin || isOwner) && inviteRequestsList}
        </Box>
      </Collapse>
    </Box>
  );
};
