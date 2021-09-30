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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  login: UserRepsonse;
  logout: Scalars['Boolean'];
  register: UserRepsonse;
  removePost: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  updateDisplayName?: Maybe<UserRepsonse>;
  updatePassword?: Maybe<UserRepsonse>;
  updatePost?: Maybe<Post>;
  updateUsername?: Maybe<UserRepsonse>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
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


export type MutationUpdateDisplayNameArgs = {
  displayName: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationUpdatePasswordArgs = {
  confirmNewPassword: Scalars['String'];
  currentPassword: Scalars['String'];
  id: Scalars['Float'];
  newPassword: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};


export type MutationUpdateUsernameArgs = {
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type NewUserInput = {
  confirmPassword: Scalars['String'];
  displayName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserRepsonse = {
  __typename?: 'UserRepsonse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegUserFragment = { __typename?: 'User', id: number, username: string, displayName: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, displayName: string }> } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  displayName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, displayName: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateUsernameMutationVariables = Exact<{
  id: Scalars['Float'];
  username: Scalars['String'];
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername?: Maybe<{ __typename?: 'UserRepsonse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string }> }> };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, displayName: string }> };

export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  id
  username
  displayName
}
    `;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
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
    mutation register($username: String!, $displayName: String!, $password: String!, $confirmPassword: String!) {
  register(
    options: {username: $username, displayName: $displayName, password: $password, confirmPassword: $confirmPassword}
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
export const UpdateUsernameDocument = gql`
    mutation updateUsername($id: Float!, $username: String!) {
  updateUsername(id: $id, username: $username) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      username
    }
  }
}
    `;

export function useUpdateUsernameMutation() {
  return Urql.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument);
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