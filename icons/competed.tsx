import * as React from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const Competed = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22.501 19.5"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M11.25 19.5a4.113 4.113 0 01-1.865-.6 17.668 17.668 0 01-1.971-1.265 23.412 23.412 0 01-5-4.686A10.74 10.74 0 010 6.428a6.274 6.274 0 011.97-4.576A6.7 6.7 0 016.621 0a6.583 6.583 0 014.629 2.074A6.584 6.584 0 0115.879 0a6.705 6.705 0 014.652 1.852A6.274 6.274 0 0122.5 6.428a10.735 10.735 0 01-2.42 6.525 23.408 23.408 0 01-4.994 4.686 17.656 17.656 0 01-1.971 1.261 4.1 4.1 0 01-1.865.6zM6.621 2.017a4.563 4.563 0 00-4.692 4.411 8.726 8.726 0 002 5.27 21.8 21.8 0 004.583 4.282 15.627 15.627 0 001.749 1.127 2.74 2.74 0 00.989.375 2.739 2.739 0 00.99-.375 15.7 15.7 0 001.748-1.127 21.785 21.785 0 004.584-4.28 8.726 8.726 0 002-5.27 4.564 4.564 0 00-4.694-4.411 5.027 5.027 0 00-3.864 2.177.939.939 0 01-1.529 0 5.031 5.031 0 00-3.864-2.179z" />
    </svg>
  );
};

const CompetedIcon = React.memo(Competed);

export default CompetedIcon;
