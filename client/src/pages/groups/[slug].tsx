import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
  useToast,
  Collapse,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import {
  useGroupBySlugQuery,
  useIsUserAdminQuery,
  useIsUserOwnerQuery,
  useUpdateGroupMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { PostList } from "../../components/post/PostList";
import { UserList } from "../../components/user/UserList";
import { EventList } from "../../components/post/EventList";

export const GroupDetails: NextPage<{ slug: string }> = ({ slug }) => {
  const toast = useToast();
  const [_updateGroup, updateGroup] = useUpdateGroupMutation();
  const [{ data, fetching, error }, _query] = useGroupBySlugQuery({
    variables: { slug },
  });
  const [isUserAdmin, _admin] = useIsUserAdminQuery({
    variables: { groupId: data?.groupBySlug?.id as number },
  });
  const [isUserOwner, _owner] = useIsUserOwnerQuery({
    variables: { groupId: data?.groupBySlug?.id as number },
  });
  const [isEditingGroup, setIsEditingGroup] = useState(false);

  if (fetching) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error: {JSON.stringify(error)}</Box>;
  }

  const isAdmin = isUserAdmin.data?.isUserAdmin;
  const isOwner = isUserOwner.data?.isUserOwner;

  const editGroupInfo = (
    <Collapse in={isEditingGroup}>
      <Box>
        <Formik
          initialValues={{
            id: data?.groupBySlug?.id as number,
            name: "",
            description: "",
            visibility: data?.groupBySlug?.visibility,
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await updateGroup(values);
            if (res.data?.updateGroup?.errors) {
              setErrors(toErrorMap(res.data.updateGroup.errors));
            } else if (res.data?.updateGroup?.group) {
              toast({
                title: "Group updated",
                description: "updateGroup Success",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setIsEditingGroup(false);
              values.name = "";
              values.description = "";
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <InputField
                name='name'
                label='Group Name'
                onChange={handleChange}
              />
              <InputField
                name='description'
                label='Description'
                onChange={handleChange}
              />
              <FormControl>
                <FormLabel htmlFor='visibility'>Group Visibility</FormLabel>
                <Select
                  w='25%'
                  bg='white'
                  name='visibility'
                  onChange={handleChange}
                  defaultValue={values.visibility}
                >
                  <option value='open'>Open</option>
                  <option value='closed'>Closed</option>
                  <option value='private'>Private</option>
                </Select>
              </FormControl>
              <Button type='submit' my='2'>
                Update Group
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Collapse>
  );

  return (
    <Box>
      <Heading textAlign='center'>
        {data?.groupBySlug?.name.toUpperCase()}
      </Heading>
      <Text textAlign='center' fontSize='xl'>
        {data?.groupBySlug?.description}
      </Text>
      {isOwner && (
        <Box bg='blue.100' px='2' py='1'>
          <Button
            onClick={() => setIsEditingGroup(!isEditingGroup)}
            w='100%'
            my='2'
          >
            Edit Group
          </Button>
          {editGroupInfo}
          <Divider borderBottomColor='gray.900' />
        </Box>
      )}
      <UserList
        groupId={data.groupBySlug.id}
        users={data.groupBySlug.users}
        inviteRequests={data.groupBySlug.inviteRequests}
        isAdmin={isAdmin}
        isOwner={isOwner}
      />
      <Divider borderBottomColor='gray.900' />
      <PostList groupId={data.groupBySlug.id} posts={data.groupBySlug.posts} />
      <Divider borderBottomColor='gray.900' />
      <EventList
        groupId={data.groupBySlug.id}
        events={data.groupBySlug.events}
        isAdmin={isAdmin}
        isOwner={isOwner}
      />
    </Box>
  );
};

GroupDetails.getInitialProps = ({ query }) => {
  return {
    slug: query.slug as string,
  };
};

export default GroupDetails;
