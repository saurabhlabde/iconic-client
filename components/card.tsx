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
  setId: any;
  onEditClick: () => void;
  onRemoveClick: () => void;
  onCompetedClick: () => void;
}

export const Card: FC<ICard> = ({
  props,
  onEditClick,
  onRemoveClick,
  onCompetedClick,
  count,
  setId,
}) => {
  const [hover, setHover] = useState(false);

  const { _id: id, text, completed, createdAt, updatedAt } = props;

  const hoverInHandel = () => {
    setHover(true);
  };

  const hoverOutHandel = () => {
    setHover(false);
  };

  return (
    <>
      <div
        className={`card-section ${hover ? "card-section-hover" : ""}`}
        style={{ backgroundColor: completed ? "#ffe60284" : "#000000" }}
        id={`${id}`}
        onMouseEnter={hoverInHandel}
        onMouseLeave={hoverOutHandel}
      >
        <div className="t-section">
          <div className="text-section ct-sec">
            <h1 className="c-text">{count + 1}</h1>
          </div>

          <div className="text-section rt-sec">
            <h1 className="r-text">
              <span>{text}</span>
            </h1>
          </div>
        </div>
        {hover && (
          <div className="re-td-section">
            <div
              className="completed-td-section er-sec"
              onClick={() => {
                setId(id);
                onCompetedClick ? onCompetedClick() : undefined;
              }}
            >
              {completed ? <CompetedFillIcon /> : <CompetedIcon />}
            </div>
            <div
              className="edit-td-section er-sec"
              onClick={() => {
                setId(id);
                onEditClick ? onEditClick() : undefined;
              }}
            >
              <EditIcon />
            </div>

            <div
              className="remove-td-section er-sec"
              onClick={() => {
                setId(id);
                onRemoveClick ? onRemoveClick() : undefined;
              }}
            >
              <Remove />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
