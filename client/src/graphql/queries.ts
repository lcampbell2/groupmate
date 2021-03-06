import { gql } from "@urql/core";
import { REG_USER, REG_POST } from "./fragments";

export const ME = gql`
  query me {
    me {
      ...RegUser
    }
  }
  ${REG_USER}
`;

export const MY_GROUPS = gql`
  query myGroups {
    myGroups {
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
  query groupBySlug($slug: String!) {
    groupBySlug(slug: $slug) {
      id
      createdAt
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
        startTime
        endTime
        location
        meetingLink
      }
    }
  }
  ${REG_POST}
`;

export const PUBLIC_GROUPS = gql`
  query publicGroups {
    publicGroups {
      id
      name
      description
      visibility
      users {
        user {
          id
        }
      }
    }
  }
`;

export const IS_USER_ADMIN = gql`
  query isUserAdmin($groupId: Float!) {
    isUserAdmin(groupId: $groupId)
  }
`;

export const IS_USER_OWNER = gql`
  query isUserOwner($groupId: Float!) {
    isUserOwner(groupId: $groupId)
  }
`;

export const MY_EVENTS = gql`
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
      startTime
      endTime
      location
      meetingLink
    }
  }
`;
