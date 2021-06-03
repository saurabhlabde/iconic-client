import gql from "graphql-tag";

export const UPDATE_GQL = gql`
  mutation UpdateTodo($id: String!, $text: String!) {
    updateTodo(update: { id: $id, text: $text }) {
      _id
      text
      completed
      createdAt
      updatedAt
    }
  }
`;
