import { twMerge } from "tailwind-merge";

export const CutCornerButton = (props) => {
  const { className, children } = props;
  return (
    <button
      className={twMerge(
        "px-4 py-2 font-thin uppercase font-heading text-sm tracking-wide relative text-white hover:bg-white hover:text-black rounded-full  ",
        className
      )}
    >
      <div className="absolute inset-0 outline outline-2 rounded-full -outline-offset-2[mask-image:linear-gradient(225deg,transparent,transparent_10px,black_10px, rounded-full  )]"></div>
     
      <span className="leading-6">{children}</span>
    </button>
  );
};
