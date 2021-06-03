import { DocumentNode, } from "@apollo/client";
import { ITodoType } from '../types/todo'

interface IRemoveCache {
        type: DocumentNode,
        client: any
        resData: ITodoType
}

export const removeCache = ({ type, client, resData }: IRemoveCache) => {
        const data: any = client.readQuery({
                query: type,
        });

        const removeTodos: Array<ITodoType> = data.todos?.filter(
                (todo: ITodoType) => {
                        return todo._id !== resData._id;
                }
        );

        client.writeQuery({
                query: type,
                data: {
                        todos: [...removeTodos],
                },
        });

}