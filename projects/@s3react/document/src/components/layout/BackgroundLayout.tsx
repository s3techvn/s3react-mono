import { FC } from "react";
import { Images } from "@/assets/images";

export const BackgroundLayout: FC = () => {
  return (
    <div className="fixed z-20 inset-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-[108rem] flex-none flex justify-end">
        <picture>
          <source srcSet={Images.bgApp1} type="image/avif" />
          <img
            src={Images.bgApp2}
            alt=""
            className="w-[71.75rem] flex-none max-w-none dark:hidden"
            decoding="async"
          />
        </picture>
        <picture>
          <source srcSet={Images.bgApp3} type="image/avif" />
          <img
            src={Images.bgApp4}
            alt=""
            className="w-[90rem] flex-none max-w-none hidden dark:block"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
};