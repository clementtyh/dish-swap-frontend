import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return (
    <div className="px-10 md:px-20 py-16 mx-auto sm:container">
      {children}
    </div>
  );
}

export default Container;
