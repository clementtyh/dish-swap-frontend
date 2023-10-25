import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return (
    <div className="px-4 py-16 mx-auto sm:container sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;
