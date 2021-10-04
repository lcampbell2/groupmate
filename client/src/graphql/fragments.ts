import { gql } from "@urql/core";

export const REG_USER = gql`
  fragment RegUser on User {
    id
    email
    displayName
  }
`;
