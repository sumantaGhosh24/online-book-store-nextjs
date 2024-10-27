"use client";

import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";

import {usePrimaryColor} from "./_components/primary-provider";

export default function NotFound() {
  const {primaryColor} = usePrimaryColor();

  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white w-[80%] h-[500px] rounded-md shadow-md flex flex-col items-center justify-center gap-5">
        <h2 className="text-2xl font-bold capitalize">404 | Not Found</h2>
        <Button
          onClick={() => router.push("/")}
          className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800`}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
