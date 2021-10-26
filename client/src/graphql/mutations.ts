import { gql } from "@urql/core";
import { REG_USER, REG_POST } from "./fragments";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...RegUser
      }
    }
  }
  ${REG_USER}
`;

export const REGISTER = gql`
  mutation register(
    $email: String!
    $displayName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      options: {
        email: $email
        displayName: $displayName
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      errors {
        field
        message
      }
      user {
        ...RegUser
      }
    }
  }
  ${REG_USER}
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($id: Float!, $email: String!) {
    updateEmail(id: $id, email: $email) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        email
      }
    }
  }
`;

export const UPDATE_DISPLAYNAME = gql`
  mutation updateDisplayName($id: Float!, $displayName: String!) {
    updateDisplayName(id: $id, displayName: $displayName) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        displayName
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $id: Float!
    $currentPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    updatePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      errors {
        field
        message
      }
      user {
        id
        updatedAt
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $resetToken: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      errors {
        field
        message
      }
      user {
        id
        updatedAt
        email
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup(
    $name: String!
    $description: String!
    $visibility: String!
  ) {
    createGroup(
      input: { name: $name, description: $description, visibility: $visibility }
    ) {
      errors {
        field
        message
      }
      group {
        id
        createdAt
        name
        description
        slug
        visibility
        users {
          user {
            displayName
          }
          role
        }
      }
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup(
    $id: Float!
    $name: String
    $description: String
    $visibility: String
  ) {
    updateGroup(
      id: $id
      name: $name
      description: $description
      visibility: $visibility
    ) {
      errors {
        field
        message
      }
      group {
        id
        updatedAt
        name
        description
        visibility
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $groupId: Float!
    $title: String!
    $description: String!
  ) {
    createPost(groupId: $groupId, title: $title, description: $description) {
      errors {
        field
        message
      }
      post {
        ...RegPost
      }
    }
  }
  ${REG_POST}
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: Float!, $title: String, $description: String) {
    updatePost(id: $id, title: $title, description: $description) {
      ...RegPost
    }
  }
  ${REG_POST}
`;

export const CREATE_REPLY = gql`
  mutation createReply($postId: Float!, $replyMessage: String!) {
    createReply(id: $postId, message: $replyMessage) {
      errors {
        field
        message
      }
      post {
        ...RegPost
      }
    }
  }
  ${REG_POST}
`;

export const JOIN_GROUP = gql`
  mutation joinGroup($id: Float!) {
    joinGroup(id: $id) {
      errors {
        field
        message
      }
      group {
        id
        name
        users {
          user {
            id
            email
            displayName
          }
          role
        }
      }
    }
  }
`;

export const CHANGE_USER_ROLE = gql`
  mutation changeUserRole(
    $userId: Float!
    $groupUser: Float!
    $newRole: String!
  ) {
    changeUserRole(userId: $userId, groupId: $groupUser, newRole: $newRole) {
      status
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($id: Float!) {
    removePost(id: $id) {
      status
    }
  }
`;

export const INVITE_USER_TO_GROUP = gql`
  mutation inviteUserToGroup(
    $groupId: Float!
    $email: String!
    $role: String!
  ) {
    inviteUserToGroup(groupId: $groupId, email: $email, role: $role) {
      status
    }
  }
`;
