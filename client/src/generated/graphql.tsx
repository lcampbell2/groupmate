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
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  forgotPassword: Scalars['Boolean'];
  login: UserRepsonse;
  logout: Scalars['Boolean'];
  register: UserRepsonse;
  removePost: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  resetPassword: UserRepsonse;
  updateDisplayName?: Maybe<UserRepsonse>;
  updateEmail?: Maybe<UserRepsonse>;
  updatePassword?: Maybe<UserRepsonse>;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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

export type NewUserInput = {
  confirmPassword: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
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
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type UserRepsonse = {
  __typename?: 'UserRepsonse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegUserFragment = { __typename?: 'User', id: number, email: string, displayName: string };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, email: string, displayName: string }> };

export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  id
  email
  displayName
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