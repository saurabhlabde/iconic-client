import { FC } from "react";

interface IButton {
  buttonName: string;
}

export const Button: FC<IButton> = ({ buttonName }) => {
  return (
    <>
      <div className="button-section">
        <button className="button" type="submit">
          {buttonName}
        </button>
      </div>
    </>
  );
};
