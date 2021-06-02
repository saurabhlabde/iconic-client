import { FC } from "react";

interface IInput {
  value: string;
  inputName: string;
  placeHolder: string;
  onChange: (e: any) => void;
}

export const Input: FC<IInput> = ({
  value,
  onChange,
  inputName,
  placeHolder,
}) => {
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
      </div>
    </>
  );
};
