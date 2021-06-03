import { DocumentNode, } from "@apollo/client";
import { ITodoType } from '../types/todo'

interface IAddCache {
        type: DocumentNode,
        client: any
        resData: ITodoType
}

export const addCache = ({ type, client, resData }: IAddCache) => {
        const data: any = client.readQuery({
                query: type,
        });

        let addedTodo = {
                completed: resData.completed,
                createdAt: resData.createdAt,
                text: resData.text,
                updatedAt: resData.updatedAt,
                __typename: "Todo",
                _id: resData._id,
        };

        client.writeQuery({
                query: type,
                data: {
                        todos: [addedTodo, ...data.todos],
                },
        });

}