import gql from "graphql-tag";

export const COMPLETE_GQL = gql`
  mutation CompletedTodo($id: String!) {
    completedTodo(completed: { id: $id }) {
      _id
      text
      completed
      createdAt
      updateAt
    }
  }
`;
