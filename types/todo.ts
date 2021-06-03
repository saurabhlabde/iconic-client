export interface ITodo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface ITodoType {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  __typename: string
}
