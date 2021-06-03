import gql from "graphql-tag";

export const TODOS_GQL = gql`
  query {
    todos {
      _id
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
