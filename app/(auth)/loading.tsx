import { Spinner } from "@/components/ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <Spinner />
    </section>
  );
};

export default Loading;
