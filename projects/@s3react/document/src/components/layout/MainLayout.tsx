import { FC, PropsWithChildren } from "react";
import { HeaderLayout } from "./HeaderLayout";
import { BackgroundLayout } from "./BackgroundLayout";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <HeaderLayout />
      <BackgroundLayout />
      {children}
    </>
  );
};
