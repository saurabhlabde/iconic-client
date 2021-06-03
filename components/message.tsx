import { FC } from "react";
import RemoveIcon from "../icons/remove";

interface IMessageCard {
  id: string;
  message: string;
  type: string;
  onClose: (id: string) => any;
}

export const MessageCard: FC<IMessageCard> = ({
  id,
  message,
  type,
  onClose,
}) => {
  console.log(type, "type");

  const bg: string =
    type === "error"
      ? "rgb(214, 37, 37)"
      : type === "success"
      ? "rgb(230, 113, 17)"
      : "";

  return (
    <>
      <div
        className="message-card-section"
        id={`${id}`}
        style={{
          backgroundColor: bg,
        }}
      >
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
