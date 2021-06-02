import { FC, useState } from "react";
import EditIcon from "../icons/edit";
import Remove from "../icons/remove";

interface ICard {
  props: {
    currency: string;
    rate: string;
  };
  onEditClick: (currency: string) => any;
  onRemoveClick: (currency: string) => any;
}

export const Card: FC<ICard> = ({ props, onEditClick, onRemoveClick }) => {
  const [hover, setHover] = useState(false);

  const { currency, rate } = props;

  const hoverHandel = () => {
    setHover(!hover);
  };

  return (
    <>
      <div
        className={`card-section ${hover ? "card-section-hover" : ""}`}
        id={`id_${currency}`}
        onMouseEnter={hoverHandel}
        onMouseLeave={hoverHandel}
      >
        <div className="t-section">
          <div className="text-section ct-sec">
            <h1 className="c-text">{currency}</h1>
          </div>

          <div className="text-section rt-sec">
            <h1 className="r-text">{rate}</h1>
          </div>
        </div>

        <div className="re-td-section">
          <div
            className="edit-td-section er-sec"
            onClick={onEditClick ? onEditClick(currency) : undefined}
          >
            <EditIcon />
          </div>

          <div
            className="remove-td-section er-sec"
            onClick={onRemoveClick ? onRemoveClick(currency) : undefined}
          >
            <Remove />
          </div>
        </div>
      </div>
    </>
  );
};
