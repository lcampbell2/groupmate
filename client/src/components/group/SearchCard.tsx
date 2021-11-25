import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  useJoinGroupMutation,
  useRequestGroupInviteMutation,
} from "../../generated/graphql";

interface SearchCardProps {
  groupId: number;
  name: string;
  description: string;
  visibility: string;
  users: number;
  joined: boolean;
}

export const SearchCard: React.FC<SearchCardProps> = ({
  groupId,
  name,
  description,
  visibility,
  users,
  joined,
}) => {
  const [_join, joinGroup] = useJoinGroupMutation();
  const [_request, requestInvite] = useRequestGroupInviteMutation();
  const toast = useToast();

  const handleJoin = async () => {
    const res = await joinGroup({ id: groupId });
    if (res?.data?.joinGroup.errors) {
      res?.data?.joinGroup.errors.forEach((err) => {
        console.error(err);
      });
      toast({
        title: "Group NOT joined.",
        description: `joinGroup error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (res.data?.joinGroup.group) {
      toast({
        title: "Group successfully joined.",
        description: `joinGroup success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleRequestInvite = async () => {
    const res = await requestInvite({ groupId });
    if (res.data?.requestGroupInvite.status) {
      toast({
        title: "Invite request successfully sent.",
        description: `requestInvite success`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invite request failed",
        description: `requestInvite error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const joinButtons =
    visibility === "open" ? (
      <Button
        bg='shirtBlue'
        textColor='shirtDark'
        _hover={{ bg: "blue.400" }}
        onClick={handleJoin}
      >
        Join
      </Button>
    ) : (
      <Button
        bg='shirtBlue'
        textColor='shirtDark'
        _hover={{ bg: "blue.400" }}
        onClick={handleRequestInvite}
      >
        Request Invite
      </Button>
    );

  return (
    <Flex
      width='100%'
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent='space-around'
      p='4'
      bg='shirtRed'
      borderWidth='2px'
      borderColor='shirtPink'
      textColor='shirtDark'
    >
      <Stack isInline align='center'>
        <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
          {name}
        </Text>
      </Stack>
      <Box mr={{ md: "1em" }} align='center'>
        <Text fontWeight='semibold'>{description}</Text>
      </Box>
      <Box mr={{ md: "1em" }} align='center'>
        <Text fontWeight='semibold'>Total users: {users}</Text>
      </Box>
      {joined ? (
        <Badge bg='shirtDark' textColor='gray.200'>
          Joined
        </Badge>
      ) : (
        joinButtons
      )}
    </Flex>
  );
};
