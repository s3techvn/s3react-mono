"use client";

import { FC, PropsWithChildren } from "react";
import { HeaderLayout } from "./HeaderLayout";
import { BackgroundLayout } from "./BackgroundLayout";
import { SidebarLayout } from "./SidebarLayout";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <HeaderLayout />
      <BackgroundLayout />
      <SidebarLayout />
      {children}
    </>
  );
};
