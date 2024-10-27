"use client";

import {useEffect} from "react";

import {Button} from "@/components/ui/button";

import {usePrimaryColor} from "./_components/primary-provider";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const {primaryColor} = usePrimaryColor();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white w-[80%] h-[500px] rounded-md shadow-md flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl font-bold capitalize text-black">
          Error | {error.message}
        </h2>
        <Button
          onClick={() => reset()}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800`}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
