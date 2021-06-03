import { FC } from "react";

interface IButton {
  buttonName: string;
  validation?: boolean;
}

export const Button: FC<IButton> = ({ buttonName, validation }) => {
  return (
    <>
      <div className={`button-section ${!validation ? "button-disable" : ""}`}>
        {validation !== undefined && validation ? (
          <button className="button" type="submit">
            {buttonName}
          </button>
        ) : (
          <button className="button" type="submit" disabled>
            {buttonName}
          </button>
        )}
        {validation === undefined && (
          <button className="button" type="submit" disabled>
            {buttonName}
          </button>
        )}
      </div>
    </>
  );
};
