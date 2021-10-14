import {
  Box,
  Button,
  Heading,
  Stack,
  useToast,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { useCreateGroupMutation } from "../../generated/graphql";

interface createProps {}

export const CreateOrganization: React.FC<createProps> = ({}) => {
  const [_, createGroup] = useCreateGroupMutation();
  const toast = useToast();
  const router = useRouter();

  return (
    <Box>
      <Heading textAlign='center'>Create a Group</Heading>
      <Formik
        initialValues={{
          name: "",
          description: "",
          visibility: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createGroup(values);
          if (res?.data?.createGroup.errors) {
            setErrors(toErrorMap(res.data.createGroup.errors));
          } else if (res.data?.createGroup.group) {
            toast({
              title: "Group successfully created.",
              description: `createGroup success`,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/groups");
          }
        }}
      >
        {({ handleChange }) => (
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
              <Select name='visibility' onChange={handleChange}>
                <option value='open'>Open</option>
                <option value='closed'>Closed</option>
                <option value='private'>Private</option>
              </Select>
            </FormControl>
            <Stack isInline my='4'>
              <Button type='submit'>Create Group</Button>
              <Button onClick={() => router.push("/")}>Back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateOrganization;
