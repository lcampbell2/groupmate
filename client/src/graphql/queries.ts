import { gql } from "@urql/core";

export const ME = gql`
  query me {
    me {
      id
      createdAt
      username
      displayName
    }
  }
`;
