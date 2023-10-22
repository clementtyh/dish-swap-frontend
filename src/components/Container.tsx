import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return (
    // <div className="sm:container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    //   {children}
    // </div>
    <div className="px-28 py-8">{children}</div>
  );
}

export default Container;
