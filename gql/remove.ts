import gql from "graphql-tag";

export const REMOVE_GQL = gql`
mutation RemoveTodo($id:String!){
  removeTodo(remove: { id: $id }) {
    _id
    text
    completed
    createdAt
    updatedAt
  }
}
`;
