import gql from "graphql-tag";

export const ADD_GQL = gql`
  mutation AddTodo($text: String!) {
    addTodo(add: { text: $text }) {
      _id
      text
      completed
      createdAt
      updateAt
    }
  }
`;
