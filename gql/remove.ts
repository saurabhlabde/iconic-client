import gql from "graphql-tag";

export const REMOVE_GQL = gql`
mutation removeTodo($id:String!){
  removeTodo(add: { id: $id }) {
    _id
    text
    completed
    createdAt
    updateAt
  }
}
`;
