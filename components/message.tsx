import { FC } from "react";
import RemoveIcon from "../icons/remove";

interface IMessageCard {
  id: string;
  message: string;
  onClose: (id: string) => any;
}

export const MessageCard: FC<IMessageCard> = ({ id, message, onClose }) => {
  return (
    <>
      <div className="message-card-section" id={`${id}`}>
        <div className="message-section">
          <h1 className="message-text">{message}</h1>
        </div>
        <div
          className="hide-section"
          onClick={() => {
            onClose ? onClose(id) : undefined;
          }}
        >
          <RemoveIcon />
        </div>
      </div>
    </>
  );
};
