import { DocumentNode, useQuery } from "@apollo/client";

interface IQuery {
        type: DocumentNode;
}

export const query = ({ type }: IQuery) => {
        return useQuery(type);
};
