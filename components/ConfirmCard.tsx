import { FC } from "react";

interface IConfirmCard {
  message: string;
  confirmButtonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmCard: FC<IConfirmCard> = ({
  message,
  confirmButtonText,
  onCancel,
  onConfirm,
}) => {
  return (
    <>
      <div className="confirm-card">
        <div className="confirm-card-section">
          <div className="confirm-text-section">
            <h1 className="confirm-text">
              {message ? message : "You are sure"}
            </h1>
          </div>

          <div className="cc-button-section">
            <div className="cancel-button-section cc-btn-sec">
              <button
                className="cancel-button cc-btn"
                onClick={onCancel ? onCancel : undefined}
              >
                Cancel
              </button>
            </div>

            <div className="confirm-button-section cc-btn-sec">
              <button
                className="comfirm-button cc-btn"
                onClick={onConfirm ? onConfirm : undefined}
              >
                {confirmButtonText ? confirmButtonText : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
