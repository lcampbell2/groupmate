import { gql } from "@urql/core";

export const REG_USER = gql`
  fragment RegUser on User {
    id
    email
    displayName
  }
`;

export const REG_POST = gql`
  fragment RegPost on Post {
    id
    title
    updatedAt
    description
    author {
      id
      displayName
    }
  }
`;
