import { EmailIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  Button,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Heading,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useRef } from "react";
import { useUpdateUsernameMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface EditableUsernameProps {
  userId: number;
  currentUsername: string;
}

export const EditableUsername: React.FC<EditableUsernameProps> = ({
  currentUsername,
  userId,
  ...props
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLHeadingElement>(null);
  const [_, updateUsername] = useUpdateUsernameMutation();

  return (
    <Stack {...props}>
      <Text fontWeight='bold' fontSize='lg'>
        Username:
      </Text>
      <Flex align='center'>
        <EmailIcon color='gray.400' />
        <Text ml='2' mb='1'>
          {currentUsername}
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
              username: "",
            }}
            initialTouched={{
              username: true,
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await updateUsername(values);
              if (res?.data?.updateUsername?.errors) {
                setErrors(toErrorMap(res.data.updateUsername.errors));
              } else if (res?.data?.updateUsername?.user) {
                toast({
                  title: `updateUsername Success`,
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
                    <Flex align='center'>
                      <Heading as='h3' size='sm'>
                        Current Username:
                      </Heading>
                      <Text ml='2'>{currentUsername}</Text>
                    </Flex>

                    <InputField
                      name='username'
                      label='New Username:'
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
