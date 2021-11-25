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
import { useUpdateEmailMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface EditableUserEmailProps {
  userId: number;
  currentEmail: string;
}

export const EditableUserEmail: React.FC<EditableUserEmailProps> = ({
  currentEmail,
  userId,
  ...props
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLHeadingElement>(null);
  const [_, updateEmail] = useUpdateEmailMutation();

  return (
    <Stack {...props}>
      <Flex align='center'>
        <EmailIcon color='white' />
        <Text fontWeight='bold' fontSize='lg' ml='2'>
          Email:
        </Text>
        <Text ml='2' mb='1'>
          {currentEmail}
        </Text>
        <Button
          bg='shirtBlue'
          textColor='shirtDark'
          _hover={{ bg: "blue.400" }}
          ml='auto'
          onClick={onOpen}
        >
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
        <ModalContent pb='4' bg='shirtDark' color='white'>
          <Formik
            validateOnBlur={false}
            initialValues={{
              id: userId,
              email: "",
            }}
            initialTouched={{
              email: true,
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await updateEmail(values);
              if (res?.data?.updateEmail?.errors) {
                setErrors(toErrorMap(res.data.updateEmail.errors));
              } else if (res?.data?.updateEmail?.user) {
                toast({
                  title: `updateEmail Success`,
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
                <ModalHeader>Edit email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing='4' p='6'>
                    <Flex align='center'>
                      <Heading as='h3' size='sm'>
                        Current email:
                      </Heading>
                      <Text ml='2'>{currentEmail}</Text>
                    </Flex>

                    <InputField
                      name='email'
                      label='New email:'
                      onChange={handleChange}
                      placeholder='New email'
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    bg='shirtBlue'
                    textColor='shirtDark'
                    _hover={{ bg: "blue.400" }}
                    isLoading={isSubmitting}
                    type='submit'
                    mr='4'
                  >
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
