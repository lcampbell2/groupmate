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

export const MY_GROUPS = gql`
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

export const GROUP_BY_SLUG = gql`
  query organizationBySlug($slug: String!) {
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
        id
        title
        updatedAt
        description
        author {
          displayName
        }
      }
    }
  }
`;
