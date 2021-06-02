import * as React from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function Remove({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 10.99 10.989"
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M10.559 8.481L7.572 5.5l2.985-2.985A1.469 1.469 0 008.481.433L5.494 3.418 2.508.429A1.47 1.47 0 00.429 2.508L3.418 5.5.436 8.476a1.469 1.469 0 002.077 2.078l2.981-2.982 2.988 2.987a1.469 1.469 0 002.077-2.078"
        fill="#fff"
      />
    </svg>
  );
}

const RemoveIcon = React.memo(Remove);
export default RemoveIcon;
