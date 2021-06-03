import { FC } from "react";

// component
import { Card } from "../components/card";

// type
import { ITodo } from "../types/todo";

interface ICards {
  props: Array<ITodo>;
  setId: any;
  onEditClick: () => void;
  onRemoveClick: () => void;
  onCompetedClick: () => void;
}

export const Cards: FC<ICards> = ({
  props,
  onEditClick,
  onRemoveClick,
  onCompetedClick,
  setId,
}) => {
  return (
    <>
      {props?.map((todo, i) => {
        return (
          <Card
            key={i}
            props={todo}
            count={i}
            onCompetedClick={onCompetedClick}
            onEditClick={onEditClick ? onEditClick : undefined}
            onRemoveClick={onRemoveClick ? onRemoveClick : undefined}
            setId={setId}
          />
        );
      })}
    </>
  );
};
