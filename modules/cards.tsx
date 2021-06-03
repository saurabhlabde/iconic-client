import { FC } from "react";

// component
import { Card } from "../components/card";

// type
import { ITodo } from "../types/todo";

interface ICards {
  props: Array<ITodo>;
  onEditClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
  onCompetedClick: (id: string) => void;
}

export const Cards: FC<ICards> = ({
  props,
  onEditClick,
  onRemoveClick,
  onCompetedClick,
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
          />
        );
      })}
    </>
  );
};
