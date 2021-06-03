import { FC } from "react";
import RemoveIcon from "../icons/remove";

interface IInput {
  value: string;
  inputName: string;
  placeHolder: string;
  onClear: () => void;
  onChange: (e: any) => void;
}

export const Input: FC<IInput> = ({
  value,
  onChange,
  inputName,
  placeHolder,
  onClear,
}) => {
  const valueLength = value.length >= 1;
  return (
    <>
      <div className="input-section">
        <input
          className="add-input"
          placeholder={`Add ${placeHolder}`}
          value={value}
          name={inputName}
          onChange={onChange ? onChange : undefined}
        />
        {valueLength && (
          <div
            className="text-clear-section"
            onClick={onClear ? onClear : undefined}
          >
            <RemoveIcon />
          </div>
        )}
      </div>
    </>
  );
};
