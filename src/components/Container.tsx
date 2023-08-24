import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return <div className="container mx-auto py-16">{children}</div>;
}

export default Container;
