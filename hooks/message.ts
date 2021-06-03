import { nanoid } from "nanoid";


interface IPopUpMessage {
        message: string;
        setMessage: any;
        type: 'error' | 'success'
}

export const popUpMessage = ({ message, setMessage, type }: IPopUpMessage) => {
        return setMessage((preMessage: any) => {
                return [
                        ...preMessage,
                        {
                                id: nanoid(),
                                message,
                                type
                        },
                ];
        });
}