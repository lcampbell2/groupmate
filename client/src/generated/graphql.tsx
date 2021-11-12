import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  status: Scalars['Boolean'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  errors?: Maybe<Array<FieldError>>;
  event?: Maybe<GroupEvent>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  events?: Maybe<Array<GroupEvent>>;
  id: Scalars['Int'];
  inviteRequests?: Maybe<Array<User>>;
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  slug: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<GroupUser>;
  visibility: Scalars['String'];
};

export type GroupEvent = {
  __typename?: 'GroupEvent';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  eventTime: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  meetingLink?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GroupResponse = {
  __typename?: 'GroupResponse';
  errors?: Maybe<Array<FieldError>>;
  group?: Maybe<Group>;
};

export type GroupUser = {
  __typename?: 'GroupUser';
  group: Group;
  id: Scalars['Int'];
  role: Scalars['String'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserRole: BooleanResponse;
  createEvent: EventResponse;
  createGroup: GroupResponse;
  createPost: PostResponse;
  createReply: PostResponse;
  dismissInviteRequest: BooleanResponse;
  forgotPassword: Scalars['Boolean'];
  inviteUserToGroup: BooleanResponse;
  joinGroup: GroupResponse;
  login: UserRepsonse;
  logout: Scalars['Boolean'];
  register: UserRepsonse;
  removePost: BooleanResponse;
  removeUser: Scalars['Boolean'];
  requestGroupInvite: BooleanResponse;
  resetPassword: UserRepsonse;
  updateDisplayName?: Maybe<UserRepsonse>;
  updateEmail?: Maybe<UserRepsonse>;
  updateGroup?: Maybe<GroupResponse>;
  updatePassword?: Maybe<UserRepsonse>;
  updatePost?: Maybe<Post>;
};


export type MutationChangeUserRoleArgs = {
  groupId: Scalars['Float'];
  newRole: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationCreateEventArgs = {
  description: Scalars['String'];
  eventTime: Scalars['String'];
  groupId: Scalars['Float'];
  location?: Maybe<Scalars['String']>;
  meetingLink?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  input: NewGroupInput;
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  groupId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationCreateReplyArgs = {
  id: Scalars['Float'];
  message: Scalars['String'];
};


export type MutationDismissInviteRequestArgs = {
  groupId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInviteUserToGroupArgs = {
  email: Scalars['String'];
  groupId: Scalars['Float'];
  role: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: NewUserInput;
};


export type MutationRemovePostArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
};


export type MutationRequestGroupInviteArgs = {
  groupId: Scalars['Float'];
};


export type MutationResetPasswordArgs = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
};


export type MutationUpdateDisplayNameArgs = {
  displayName: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationUpdateGroupArgs = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};


export type MutationUpdatePasswordArgs = {
  confirmNewPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  id: Scalars['Float'];
  newPassword: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type NewGroupInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  visibility: Scalars['String'];
};

export type NewUserInput = {
  confirmPassword: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  replies?: Maybe<Array<PostReply>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostReply = {
  __typename?: 'PostReply';
  author: User;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  message: Scalars['String'];
  post: Post;
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  groupBySlug?: Maybe<Group>;
  groups: Array<Group>;
  isUserAdmin: Scalars['Boolean'];
  isUserOwner: Scalars['Boolean'];
  me?: Maybe<User>;
  myEvents?: Maybe<Array<GroupEvent>>;
  myGroups?: Maybe<Array<GroupUser>>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  publicGroups?: Maybe<Array<Group>>;
  users: Array<User>;
};


export type QueryGroupBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryIsUserAdminArgs = {
  groupId: Scalars['Float'];
};


export type QueryIsUserOwnerArgs = {
  groupId: Scalars['Float'];
};


export type QueryMyGroupsArgs = {
  userId: Scalars['Float'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  groups: Array<GroupUser>;
  id: Scalars['Int'];
  inviteRequests?: Maybe<Array<Group>>;
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['String'];
};

export type UserRepsonse = {
  __typename?: 'UserRepsonse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegUserFragment = { __typename?: 'User', id: number, email: string, displayName: string };

export type RegPostFragment = { __typename?: 'Post', id: number, title: string, updatedAt: string, description: string, author: { __typename?: 'User', id: number, displayName: string }, replies?: Maybe<Array<{ __typename?: 'PostReply', id: number, updatedAt: string, message: string, author: { __typename?: 'User', id: number, displayName: string } }>> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, displayName: string }> } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  displayName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, email: string, displayName: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateEmailMutationVariables = Exact<{
  id: Scalars['Float'];
  email: Scalars['String'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail?: Maybe<{ __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, email: string }> }> };

export type UpdateDisplayNameMutationVariables = Exact<{
  id: Scalars['Float'];
  displayName: Scalars['String'];
}>;


export type UpdateDisplayNameMutation = { __typename?: 'Mutation', updateDisplayName?: Maybe<{ __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, displayName: string }> }> };

export type UpdatePasswordMutationVariables = Exact<{
  id: Scalars['Float'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmNewPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: Maybe<{ __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, updatedAt: string }> }> };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String'];
  newPassword: Scalars['String'];
  confirmNewPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, updatedAt: string, email: string }> } };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  visibility: Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GroupResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, group?: Maybe<{ __typename?: 'Group', id: number, createdAt: string, name: string, description: string, slug: string, visibility: string, users: Array<{ __typename?: 'GroupUser', role: string, user: { __typename?: 'User', displayName: string } }> }> } };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup?: Maybe<{ __typename?: 'GroupResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, group?: Maybe<{ __typename?: 'Group', id: number, updatedAt: string, name: string, description: string, visibility: string }> }> };

export type CreatePostMutationVariables = Exact<{
  groupId: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', id: number, title: string, updatedAt: string, description: string, author: { __typename?: 'User', id: number, displayName: string }, replies?: Maybe<Array<{ __typename?: 'PostReply', id: number, updatedAt: string, message: string, author: { __typename?: 'User', id: number, displayName: string } }>> }> } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: number, title: string, updatedAt: string, description: string, author: { __typename?: 'User', id: number, displayName: string }, replies?: Maybe<Array<{ __typename?: 'PostReply', id: number, updatedAt: string, message: string, author: { __typename?: 'User', id: number, displayName: string } }>> }> };

export type CreateReplyMutationVariables = Exact<{
  postId: Scalars['Float'];
  replyMessage: Scalars['String'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'PostResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, post?: Maybe<{ __typename?: 'Post', id: number, title: string, updatedAt: string, description: string, author: { __typename?: 'User', id: number, displayName: string }, replies?: Maybe<Array<{ __typename?: 'PostReply', id: number, updatedAt: string, message: string, author: { __typename?: 'User', id: number, displayName: string } }>> }> } };

export type JoinGroupMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', joinGroup: { __typename?: 'GroupResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, group?: Maybe<{ __typename?: 'Group', id: number, name: string, users: Array<{ __typename?: 'GroupUser', role: string, user: { __typename?: 'User', id: number, email: string, displayName: string } }> }> } };

export type ChangeUserRoleMutationVariables = Exact<{
  userId: Scalars['Float'];
  groupId: Scalars['Float'];
  newRole: Scalars['String'];
}>;


export type ChangeUserRoleMutation = { __typename?: 'Mutation', changeUserRole: { __typename?: 'BooleanResponse', status: boolean } };

export type RemovePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: { __typename?: 'BooleanResponse', status: boolean } };

export type InviteUserToGroupMutationVariables = Exact<{
  groupId: Scalars['Float'];
  email: Scalars['String'];
  role: Scalars['String'];
}>;


export type InviteUserToGroupMutation = { __typename?: 'Mutation', inviteUserToGroup: { __typename?: 'BooleanResponse', status: boolean } };

export type RequestGroupInviteMutationVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type RequestGroupInviteMutation = { __typename?: 'Mutation', requestGroupInvite: { __typename?: 'BooleanResponse', status: boolean } };

export type DismissInviteRequestMutationVariables = Exact<{
  userId: Scalars['Float'];
  groupId: Scalars['Float'];
}>;


export type DismissInviteRequestMutation = { __typename?: 'Mutation', dismissInviteRequest: { __typename?: 'BooleanResponse', status: boolean } };

export type CreateEventMutationVariables = Exact<{
  groupId: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  eventTime: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  meetingLink?: Maybe<Scalars['String']>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'EventResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, event?: Maybe<{ __typename?: 'GroupEvent', id: number, title: string, description: string, eventTime: string, location?: Maybe<string>, meetingLink?: Maybe<string> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, displayName: string }> };

export type MyGroupsQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type MyGroupsQuery = { __typename?: 'Query', myGroups?: Maybe<Array<{ __typename?: 'GroupUser', id: number, role: string, group: { __typename?: 'Group', id: number, name: string, description: string, slug: string, visibility: string } }>> };

export type GroupBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GroupBySlugQuery = { __typename?: 'Query', groupBySlug?: Maybe<{ __typename?: 'Group', id: number, name: string, description: string, visibility: string, users: Array<{ __typename?: 'GroupUser', id: number, role: string, user: { __typename?: 'User', id: number, displayName: string } }>, posts?: Maybe<Array<{ __typename?: 'Post', id: number, title: string, updatedAt: string, description: string, author: { __typename?: 'User', id: number, displayName: string }, replies?: Maybe<Array<{ __typename?: 'PostReply', id: number, updatedAt: string, message: string, author: { __typename?: 'User', id: number, displayName: string } }>> }>>, inviteRequests?: Maybe<Array<{ __typename?: 'User', id: number, displayName: string, email: string }>>, events?: Maybe<Array<{ __typename?: 'GroupEvent', id: number, title: string, description: string, eventTime: string, location?: Maybe<string>, meetingLink?: Maybe<string> }>> }> };

export type PublicGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicGroupsQuery = { __typename?: 'Query', publicGroups?: Maybe<Array<{ __typename?: 'Group', id: number, name: string, description: string, visibility: string, users: Array<{ __typename?: 'GroupUser', group: { __typename?: 'Group', id: number } }> }>> };

export type IsUserAdminQueryVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type IsUserAdminQuery = { __typename?: 'Query', isUserAdmin: boolean };

export type IsUserOwnerQueryVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type IsUserOwnerQuery = { __typename?: 'Query', isUserOwner: boolean };

export type MyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsQuery = { __typename?: 'Query', myEvents?: Maybe<Array<{ __typename?: 'GroupEvent', id: number, title: string, description: string, eventTime: string, location?: Maybe<string>, meetingLink?: Maybe<string>, group: { __typename?: 'Group', id: number, name: string, slug: string } }>> };

export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  id
  email
  displayName
}
    `;
export const RegPostFragmentDoc = gql`
    fragment RegPost on Post {
  id
  title
  updatedAt
  description
  author {
    id
    displayName
  }
  replies {
    id
    updatedAt
    message
    author {
      id
      displayName
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegUser
    }
  }
}
    ${RegUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation register($email: String!, $displayName: String!, $password: String!, $confirmPassword: String!) {
  register(
    options: {email: $email, displayName: $displayName, password: $password, confirmPassword: $confirmPassword}
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
    ${RegUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UpdateEmailDocument = gql`
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

export function useUpdateEmailMutation() {
  return Urql.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument);
};
export const UpdateDisplayNameDocument = gql`
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

export function useUpdateDisplayNameMutation() {
  return Urql.useMutation<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>(UpdateDisplayNameDocument);
};
export const UpdatePasswordDocument = gql`
    mutation updatePassword($id: Float!, $currentPassword: String!, $newPassword: String!, $confirmNewPassword: String!) {
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

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($resetToken: String!, $newPassword: String!, $confirmNewPassword: String!) {
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

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const CreateGroupDocument = gql`
    mutation createGroup($name: String!, $description: String!, $visibility: String!) {
  createGroup(
    input: {name: $name, description: $description, visibility: $visibility}
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

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
};
export const UpdateGroupDocument = gql`
    mutation updateGroup($id: Float!, $name: String, $description: String, $visibility: String) {
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

export function useUpdateGroupMutation() {
  return Urql.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument);
};
export const CreatePostDocument = gql`
    mutation createPost($groupId: Float!, $title: String!, $description: String!) {
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
    ${RegPostFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const UpdatePostDocument = gql`
    mutation updatePost($id: Float!, $title: String, $description: String) {
  updatePost(id: $id, title: $title, description: $description) {
    ...RegPost
  }
}
    ${RegPostFragmentDoc}`;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const CreateReplyDocument = gql`
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
    ${RegPostFragmentDoc}`;

export function useCreateReplyMutation() {
  return Urql.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument);
};
export const JoinGroupDocument = gql`
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

export function useJoinGroupMutation() {
  return Urql.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument);
};
export const ChangeUserRoleDocument = gql`
    mutation changeUserRole($userId: Float!, $groupId: Float!, $newRole: String!) {
  changeUserRole(userId: $userId, groupId: $groupId, newRole: $newRole) {
    status
  }
}
    `;

export function useChangeUserRoleMutation() {
  return Urql.useMutation<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>(ChangeUserRoleDocument);
};
export const RemovePostDocument = gql`
    mutation removePost($id: Float!) {
  removePost(id: $id) {
    status
  }
}
    `;

export function useRemovePostMutation() {
  return Urql.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument);
};
export const InviteUserToGroupDocument = gql`
    mutation inviteUserToGroup($groupId: Float!, $email: String!, $role: String!) {
  inviteUserToGroup(groupId: $groupId, email: $email, role: $role) {
    status
  }
}
    `;

export function useInviteUserToGroupMutation() {
  return Urql.useMutation<InviteUserToGroupMutation, InviteUserToGroupMutationVariables>(InviteUserToGroupDocument);
};
export const RequestGroupInviteDocument = gql`
    mutation requestGroupInvite($groupId: Float!) {
  requestGroupInvite(groupId: $groupId) {
    status
  }
}
    `;

export function useRequestGroupInviteMutation() {
  return Urql.useMutation<RequestGroupInviteMutation, RequestGroupInviteMutationVariables>(RequestGroupInviteDocument);
};
export const DismissInviteRequestDocument = gql`
    mutation dismissInviteRequest($userId: Float!, $groupId: Float!) {
  dismissInviteRequest(userId: $userId, groupId: $groupId) {
    status
  }
}
    `;

export function useDismissInviteRequestMutation() {
  return Urql.useMutation<DismissInviteRequestMutation, DismissInviteRequestMutationVariables>(DismissInviteRequestDocument);
};
export const CreateEventDocument = gql`
    mutation createEvent($groupId: Float!, $title: String!, $description: String!, $eventTime: String!, $location: String, $meetingLink: String) {
  createEvent(
    groupId: $groupId
    title: $title
    description: $description
    eventTime: $eventTime
    location: $location
    meetingLink: $meetingLink
  ) {
    errors {
      field
      message
    }
    event {
      id
      title
      description
      eventTime
      location
      meetingLink
    }
  }
}
    `;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const MeDocument = gql`
    query me {
  me {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyGroupsDocument = gql`
    query myGroups($userId: Float!) {
  myGroups(userId: $userId) {
    id
    group {
      id
      name
      description
      slug
      visibility
    }
    role
  }
}
    `;

export function useMyGroupsQuery(options: Omit<Urql.UseQueryArgs<MyGroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyGroupsQuery>({ query: MyGroupsDocument, ...options });
};
export const GroupBySlugDocument = gql`
    query groupBySlug($slug: String!) {
  groupBySlug(slug: $slug) {
    id
    name
    description
    visibility
    users {
      id
      user {
        id
        displayName
      }
      role
    }
    posts {
      ...RegPost
    }
    inviteRequests {
      id
      displayName
      email
    }
    events {
      id
      title
      description
      eventTime
      location
      meetingLink
    }
  }
}
    ${RegPostFragmentDoc}`;

export function useGroupBySlugQuery(options: Omit<Urql.UseQueryArgs<GroupBySlugQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GroupBySlugQuery>({ query: GroupBySlugDocument, ...options });
};
export const PublicGroupsDocument = gql`
    query publicGroups {
  publicGroups {
    id
    name
    description
    visibility
    users {
      group {
        id
      }
    }
  }
}
    `;

export function usePublicGroupsQuery(options: Omit<Urql.UseQueryArgs<PublicGroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PublicGroupsQuery>({ query: PublicGroupsDocument, ...options });
};
export const IsUserAdminDocument = gql`
    query isUserAdmin($groupId: Float!) {
  isUserAdmin(groupId: $groupId)
}
    `;

export function useIsUserAdminQuery(options: Omit<Urql.UseQueryArgs<IsUserAdminQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsUserAdminQuery>({ query: IsUserAdminDocument, ...options });
};
export const IsUserOwnerDocument = gql`
    query isUserOwner($groupId: Float!) {
  isUserOwner(groupId: $groupId)
}
    `;

export function useIsUserOwnerQuery(options: Omit<Urql.UseQueryArgs<IsUserOwnerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsUserOwnerQuery>({ query: IsUserOwnerDocument, ...options });
};
export const MyEventsDocument = gql`
    query myEvents {
  myEvents {
    id
    title
    description
    group {
      id
      name
      slug
    }
    eventTime
    location
    meetingLink
  }
}
    `;

export function useMyEventsQuery(options: Omit<Urql.UseQueryArgs<MyEventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyEventsQuery>({ query: MyEventsDocument, ...options });
};