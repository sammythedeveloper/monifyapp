import { twMerge } from "tailwind-merge";

export const Circle = (props) => {
  const { className, children } = props;
  return (
    <div
      className={twMerge(
        "bg-zinc-900 size-[240px] inline-flex items-center justify-center rounded-full  outline-[6px] -outline-offset-[6px] outline",
        className
      )}
    >
      {children}
    </div>
  );
};
