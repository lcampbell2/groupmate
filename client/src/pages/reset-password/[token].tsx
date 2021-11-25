import { Box, Divider } from "@chakra-ui/layout";
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
          const { data } = await resetPassword(values);
          if (data?.resetPassword.errors) {
            setErrors(toErrorMap(data.resetPassword.errors));
          } else if (data?.resetPassword.user) {
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
              placeholder='New password'
            />
            <InputField
              type='password'
              name='confirmNewPassword'
              label='Confirm New Password'
              onChange={handleChange}
              placeholder='Confirm new password'
            />
            <Stack isInline my='4'>
              <Button
                bg='shirtBlue'
                textColor='shirtDark'
                _hover={{ bg: "blue.400" }}
                type='submit'
              >
                Submit
              </Button>
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
