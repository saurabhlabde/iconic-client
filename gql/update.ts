import gql from "graphql-tag";

export const UPDATE_GQL = gql`
  mutation UpdateTodos($id: String!, $text: String!) {
    updateTodos(update: { id: $id, text: $text }) {
      _id
      text
      completed
      createdAt
      updateAt
    }
  }
`;
