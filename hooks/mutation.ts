import { useMutation, DocumentNode } from "@apollo/client";

interface IMutation {
        type: DocumentNode;
        variables: any;
}

export const mutation = ({ type, variables }: IMutation) => {

        const [handel, result] = useMutation(type, {
                onError(err: any) { },
                variables,
        });

        const { loading, data, error, client } = result;

        return { handel, data, error, loading, client };
};
