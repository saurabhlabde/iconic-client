import * as React from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const Edit = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13.605 13.605"
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        data-name="Fill 1"
        d="M12.844 12.058H8.539a.768.768 0 00-.761.774.768.768 0 00.761.774h4.3a.768.768 0 00.766-.774.768.768 0 00-.761-.774"
        fill="#fff"
        opacity={0.4}
      />
      <path
        data-name="Fill 3"
        d="M5.525 2.95L9.6 6.246a.234.234 0 01.038.324l-4.835 6.3a1.587 1.587 0 01-1.232.618l-2.64.033a.3.3 0 01-.3-.236l-.6-2.608a1.616 1.616 0 01.3-1.357L5.2 2.989a.226.226 0 01.325-.039"
        fill="#fff"
      />
      <path
        data-name="Fill 5"
        d="M11.429 4.282l-.786.982a.225.225 0 01-.32.037L6.241 1.992a.233.233 0 01-.033-.327l.758-.942a1.944 1.944 0 012.856-.2l1.112.886a2.318 2.318 0 01.864 1.324 1.819 1.819 0 01-.368 1.544"
        fill="#fff"
        opacity={0.4}
      />
    </svg>
  );
};

const EditIcon = React.memo(Edit);
export default EditIcon;
