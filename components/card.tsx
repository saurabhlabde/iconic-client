import { FC, useState } from "react";
import EditIcon from "../icons/edit";
import Remove from "../icons/remove";
import CompetedIcon from "../icons/competed";
import CompetedFillIcon from "../icons/competedFill";

interface ICard {
  props: {
    _id: string;
    text: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  };
  count: number;
  onEditClick: (id: string) => any;
  onRemoveClick: (id: string) => any;
  onCompetedClick: (id: string) => any;
}

export const Card: FC<ICard> = ({
  props,
  onEditClick,
  onRemoveClick,
  onCompetedClick,
  count,
}) => {
  const [hover, setHover] = useState(false);

  const { _id: id, text, completed, createdAt, updatedAt } = props;

  const hoverHandel = () => {
    setHover(!hover);
  };

  return (
    <>
      <div
        className={`card-section ${hover ? "card-section-hover" : ""}`}
        style={{ backgroundColor: completed ? "#ffe60284" : "#000000" }}
        id={`${id}`}
        onMouseEnter={hoverHandel}
        onMouseLeave={hoverHandel}
      >
        <div className="t-section">
          <div className="text-section ct-sec">
            <h1 className="c-text">{count + 1}</h1>
          </div>

          <div className="text-section rt-sec">
            <h1 className="r-text">{text}</h1>
          </div>
        </div>

        <div className="re-td-section">
          <div
            className="remove-td-section er-sec"
            onClick={() => {
              onCompetedClick ? onCompetedClick(id) : undefined;
            }}
          >
            {completed ? <CompetedFillIcon /> : <CompetedIcon />}
          </div>
          <div
            className="edit-td-section er-sec"
            onClick={() => {
              onEditClick ? onEditClick(id) : undefined;
            }}
          >
            <EditIcon />
          </div>

          <div
            className="remove-td-section er-sec"
            onClick={() => {
              onRemoveClick ? onRemoveClick(id) : undefined;
            }}
          >
            <Remove />
          </div>
        </div>
      </div>
    </>
  );
};
