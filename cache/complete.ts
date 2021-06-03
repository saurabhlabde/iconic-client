import { DocumentNode, } from "@apollo/client";
import { ITodoType } from '../types/todo'

interface ICompleteCache {
        type: DocumentNode,
        client: any
        resData: ITodoType
}

export const completedCache = ({ type, client, resData }: ICompleteCache) => {

        const data: any = client.readQuery({
                query: type,
        });

        let completedTodo = {
                completed: resData.completed,
                createdAt: resData.createdAt,
                text: resData.text,
                updatedAt: resData.updatedAt,
                __typename: "Todo",
                _id: resData._id,
        };



        const completedTodos: Array<ITodoType> = data.todos?.filter(
                (todo: ITodoType) => {
                        return todo._id !== resData._id;
                }
        );

        client.writeQuery({
                query: type,
                data: {
                        todos: [completedTodo, ...completedTodos],
                },
        });

}