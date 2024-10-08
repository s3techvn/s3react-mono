"use client";

import { FC, PropsWithChildren } from "react";
import { HeaderLayout } from "./HeaderLayout";
import { BackgroundLayout } from "./BackgroundLayout";
import { SidebarLayout } from "./SidebarLayout";
import { BodyLayout } from "./BodyLayout";

export const MainLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <HeaderLayout />
      <BackgroundLayout />
      <SidebarLayout />
      <BodyLayout>
        {children}
      </BodyLayout>
    </>
  );
};
