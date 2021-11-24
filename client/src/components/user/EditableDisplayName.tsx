import { AtSignIcon } from "@chakra-ui/icons";
import { Stack, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Heading,
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
import { useUpdateDisplayNameMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";

interface EditableDisplayNameProps {
  currentDisplayName: string;
  userId: number;
}

export const EditableDisplayName: React.FC<EditableDisplayNameProps> = ({
  currentDisplayName,
  userId,
  ...props
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLHeadingElement>(null);
  const [_, updateDisplayName] = useUpdateDisplayNameMutation();
  return (
    <Stack {...props}>
      <Text fontWeight='bold' fontSize='lg'>
        Display Name:
      </Text>
      <Flex align='center'>
        <AtSignIcon color='shirtDark' />
        <Text ml='2'>{currentDisplayName}</Text>
        <Button
          bg='shirtDark'
          textColor='gray.200'
          _hover={{ bg: "gray.700" }}
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
              displayName: "",
            }}
            initialTouched={{
              displayName: true,
            }}
            onSubmit={async (values, { setErrors }) => {
              const res = await updateDisplayName(values);
              if (res?.data?.updateDisplayName?.errors) {
                setErrors(toErrorMap(res.data.updateDisplayName.errors));
              } else if (res?.data?.updateDisplayName?.user) {
                toast({
                  title: `updateDisplayName Success`,
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
                <ModalHeader>Edit Display Name</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing='4' p='6'>
                    <Flex align='center'>
                      <Heading as='h3' size='sm'>
                        Current Display Name:
                      </Heading>
                      <Text ml='2'>{currentDisplayName}</Text>
                    </Flex>

                    <InputField
                      name='displayName'
                      label='New Display Name:'
                      onChange={handleChange}
                    />
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    isLoading={isSubmitting}
                    type='submit'
                    mr='4'
                    bg='white'
                    textColor='black'
                    _hover={{ bg: "gray.400" }}
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
