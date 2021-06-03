import { DocumentNode, } from "@apollo/client";
import { ITodoType } from '../types/todo'

interface IUpdateCache {
        type: DocumentNode,
        client: any
        resData: ITodoType
}

export const updateCache = ({ type, client, resData }: IUpdateCache) => {
        const data: any = client.readQuery({
                query: type,
        });

        let updatedTodo = {
                completed: resData.completed,
                createdAt: resData.createdAt,
                text: resData.text,
                updatedAt: resData.updatedAt,
                __typename: "Todo",
                _id: resData._id,
        };

        const updatedTodos: Array<ITodoType> = data.todos?.filter(
                (todo: ITodoType) => {
                        return todo._id !== resData._id;
                }
        );

        client.writeQuery({
                query: type,
                data: {
                        todos: [updatedTodo, ...updatedTodos],
                },
        });

}
