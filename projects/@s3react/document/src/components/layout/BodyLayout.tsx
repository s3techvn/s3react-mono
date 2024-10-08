import { FC, PropsWithChildren } from "react";
import { Container } from "@s3react/core/Container";

export const BodyLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <main className="pt-12 pl-[220px]">
      <Container size="sm">
        {children}
      </Container>
    </main>
  );
};