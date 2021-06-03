import { FC } from "react";

//component
import { MessageCard } from "../components/message";

interface IMessage {
  id: string;
  message: string;
  type: string;
}

interface IMessages {
  messages: Array<IMessage>;
  onMessageClose: (id: string) => void;
}

export const Messages: FC<IMessages> = ({ messages, onMessageClose }) => {
  return (
    <>
      {messages?.map((message: IMessage) => {
        return (
          <MessageCard
            key={message.id}
            id={message.id}
            message={message.message}
            type={message.type}
            onClose={onMessageClose ? onMessageClose : undefined}
          />
        );
      })}
    </>
  );
};
