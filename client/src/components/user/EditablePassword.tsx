import { LockIcon } from "@chakra-ui/icons";
import { Stack, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useRef } from "react";
import { useUpdatePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface EditablePasswordProps {
  userId: number;
}

export const EditablePassword: React.FC<EditablePasswordProps> = ({
  userId,
  ...props
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLHeadingElement>(null);
  const [_, updatePassword] = useUpdatePasswordMutation();
  return (
    <Stack {...props}>
      <Text fontWeight='bold' fontSize='lg'>
        Password:
      </Text>
      <Flex align='center'>
        <LockIcon color='gray.400' />
        <Text ml='2' mt='2'>
          ********
        </Text>
        <Button ml='auto' onClick={onOpen}>
          Edit
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent pb='4'>
          <Formik
            validateOnBlur={false}
            initialValues={{
              id: userId,
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            initialTouched={{
              currentPassword: true,
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await updatePassword(values);
              if (res?.data?.updatePassword?.errors) {
                setErrors(toErrorMap(res.data.updatePassword.errors));
              } else if (res?.data?.updatePassword?.user) {
                toast({
                  title: `updatePassword Success`,
                  description: "description",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                onClose();
              }
            }}
          >
            {({ handleSubmit, handleChange, isSubmitting }) => (
              <form id='form' onSubmit={handleSubmit}>
                <ModalHeader>Edit Username</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing='4' p='6'>
                    <InputField
                      type='password'
                      name='currentPassword'
                      label='Current Password:'
                      onChange={handleChange}
                    />

                    <InputField
                      type='password'
                      name='newPassword'
                      label='New Password:'
                      onChange={handleChange}
                    />

                    <InputField
                      type='password'
                      name='confirmNewPassword'
                      label='Confirm New Password:'
                      onChange={handleChange}
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button isLoading={isSubmitting} type='submit' mr='4'>
                    Confirm
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
