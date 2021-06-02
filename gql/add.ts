import gql from "graphql-tag";

export const ADD_GQL = gql`
  mutation addTodo($text: String!) {
    addTodo(add: { text: $text }) {
      _id
      text
      completed
      createdAt
      updateAt
    }
  }
`;
