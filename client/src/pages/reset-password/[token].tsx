import { Box } from "@chakra-ui/layout";
import { useToast, Heading, Stack, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/dist/client/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { useResetPasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

export const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  const toast = useToast();
  const [_, resetPassword] = useResetPasswordMutation();

  return (
    <Box>
      <Heading textAlign='center'>Reset Password Page</Heading>
      <Formik
        initialValues={{
          resetToken: token,
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await resetPassword(values);
          if (res.data.resetPassword.errors) {
            setErrors(toErrorMap(res.data.resetPassword.errors));
          } else if (res.data?.resetPassword.user) {
            toast({
              title: `resetPassword Success`,
              description: "description",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/login");
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField
              type='password'
              name='newPassword'
              label='New Password'
              onChange={handleChange}
            />
            <InputField
              type='password'
              name='confirmNewPassword'
              label='Confirm New Password'
              onChange={handleChange}
            />
            <Stack isInline my='4'>
              <Button type='submit'>Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ResetPassword;
