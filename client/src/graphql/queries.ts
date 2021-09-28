import { gql } from "@urql/core";
import { REG_USER } from "./fragments";

export const ME = gql`
  query me {
    me {
      ...RegUser
    }
  }
  ${REG_USER}
`;
