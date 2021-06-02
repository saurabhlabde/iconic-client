import { FC } from "react";
import RemoveIcon from "../icons/remove";

interface IMessageCard {
  message: string;
  onClose: () => void;
}

export const MessageCard: FC<IMessageCard> = ({ message, onClose }) => {
  return (
    <>
      <div className="message-card-section">
        <div className="message-section">
          <h1 className="message-text">Currency alrady exist</h1>
        </div>
        <div className="hide-section">
          <RemoveIcon />
        </div>
      </div>
    </>
  );
};
