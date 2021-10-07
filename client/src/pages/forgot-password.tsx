import { Box, Button, Heading, Stack, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const toast = useToast();
  const [_, forgotPassword] = useForgotPasswordMutation();

  return (
    <Box>
      <Heading textAlign='center'>Forgot Password Page</Heading>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          toast({
            title: `forgotPassword Success`,
            description: "description",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          router.push("/");
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField name='email' label='Email' onChange={handleChange} />
            <Stack isInline my='4'>
              <Button type='submit'>Submit</Button>
              <Button onClick={() => router.push("/login")}>Back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
