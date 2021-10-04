import React from "react";
import { Button } from "@chakra-ui/button";
import { Stack, useToast } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { LOGIN } from "../graphql/mutations";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [_, login] = useMutation(LOGIN);
  const toast = useToast();

  return (
    <Box>
      <Heading textAlign='center'>Login to your account</Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values);
          if (res.data.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            toast({
              title: `Welcome, ${res.data.login.user.displayName}`,
              description:
                "You have been successfully been logged in to Groupmate",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/");
          }
        }}
      >
        {({ handleChange }) => (
          <Form>
            <InputField name='email' label='Email' onChange={handleChange} />
            <InputField
              type='password'
              name='password'
              label='Password'
              onChange={handleChange}
            />
            <Stack isInline my='4'>
              <Button type='submit'>Login</Button>
              <Button onClick={() => router.push("/")}>Back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
