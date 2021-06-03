import { FC } from "react";

// component
import { Input } from "../components/input";
import { Button } from "../components/button";

interface IForm {
  value: string;
  onValueChange: any;
  onSubmit: (e: any) => void;
  onClear: () => void;
}

export const Forms: FC<IForm> = ({
  value,
  onValueChange,
  onSubmit,
  onClear,
}) => {
  const validation = value.length >= 1;

  return (
    <>
      <form className="form-add" onSubmit={onSubmit ? onSubmit : undefined}>
        <Input
          value={value}
          inputName="value"
          placeHolder={"what's in your mind"}
          onChange={onValueChange}
          onClear={onClear}
        />
        <Button buttonName="add" validation={validation} />
      </form>
    </>
  );
};
