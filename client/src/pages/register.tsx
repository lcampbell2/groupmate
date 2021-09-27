import React from "react";
import { Button } from "@chakra-ui/button";
import { useToast, Stack } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { REGISTER } from "../graphql/mutations";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [_, register] = useMutation(REGISTER);
  const toast = useToast();

  return (
    <Box>
      <Heading textAlign='center'>Register your account</Heading>
      <Formik
        initialValues={{
          username: "",
          displayName: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values);
          if (res.data.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else if (res.data?.register.user) {
            console.log(JSON.stringify(res.data));
            toast({
              title: "Account successfully created.",
              description: `Thank you for registering with us, ${res.data.register.user.displayName}`,
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
            <InputField
              name='username'
              label='Username'
              onChange={handleChange}
            />
            <InputField
              name='displayName'
              label='Display Name'
              onChange={handleChange}
            />
            <InputField
              type='password'
              name='password'
              label='Password'
              onChange={handleChange}
            />
            <InputField
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              onChange={handleChange}
            />
            <Stack isInline my='4'>
              <Button type='submit'>Register</Button>
              <Button onClick={() => router.push("/")}>Back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
