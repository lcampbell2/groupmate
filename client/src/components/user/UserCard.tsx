import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Flex, Box, Stack, Text } from "@chakra-ui/layout";
import { Select, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useChangeUserRoleMutation } from "../../generated/graphql";

interface UserCardProps {
  userId: number;
  groupId: number;
  displayName: string;
  role: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  userId,
  groupId,
  displayName,
  role,
  isAdmin,
  isOwner,
}) => {
  const [_, changeRole] = useChangeUserRoleMutation();
  const toast = useToast();

  return (
    <Flex
      width='100%'
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent='space-around'
      p='4'
    >
      <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
        {displayName}
      </Text>
      {(isAdmin || isOwner) && role !== "admin" && role !== "owner" ? (
        <Box>
          <Formik
            initialValues={{ newRole: role, groupId, userId }}
            onSubmit={async (values) => {
              const res = await changeRole(values);
              if (res.data?.changeUserRole.status) {
                toast({
                  title: "User Role Updated",
                  description: `changeRole success`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Role not changed",
                  description: `changeRole error`,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <Stack isInline align='center'>
                  <FormControl>
                    <Flex align='center'>
                      <FormLabel htmlFor='newRole'>Role:</FormLabel>

                      <Select
                        name='newRole'
                        onChange={handleChange}
                        defaultValue={values.newRole}
                      >
                        <option value='read'>READ</option>
                        <option value='write'>WRITE</option>
                        {isOwner && <option value='admin'>ADMIN</option>}
                      </Select>
                    </Flex>
                  </FormControl>
                  <Button type='submit'>Update</Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      ) : (
        <Text fontWeight='semibold'>{role.toUpperCase()}</Text>
      )}
    </Flex>
  );
};
