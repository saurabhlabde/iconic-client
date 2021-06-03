import gql from "graphql-tag";

export const TODO_GQL = gql`
  query Todo($id: String!) {
    todo(todo: { id: $id }) {
      _id
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
