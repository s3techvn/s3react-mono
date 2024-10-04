import { FC } from "react";
import clsx from "clsx";

export const HeaderLayout: FC = () => {
  return (
    <div
      className={clsx(
        "fixed top-0 z-50 w-full h-12 backdrop-blur flex border-b border-slate-50/[0.06] items-center px-[max(0px,calc(50%-45rem))]",
        "bg-slate-900/75 shadow-white text-slate-100"
      )}
    >
      <div className="text-lg font-bold pl-8">
        SVGroup React Tailwind Components Document
      </div>
    </div>
  );
};
