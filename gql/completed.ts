import gql from "graphql-tag";

export const COMPLETED_GQL = gql`
  mutation completedTodo($id: String!) {
    completedTodo(completed: { id: $id }) {
      _id
      text
      completed
      createdAt
      updateAt
    }
  }
`;
