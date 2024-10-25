"use client";

import {ModeToggle} from "@/components/mode-toggle";
import {usePrimaryColor} from "@/components/primary-provider";
import PrimaryToggle from "@/components/primary-toggle";
import {Button} from "@/components/ui/button";

export default function Home() {
  const {primaryColor} = usePrimaryColor();

  return (
    <div>
      <ModeToggle />
      <PrimaryToggle />
      <Button
        className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
      >
        Button
      </Button>
      <h3 className={`text-${primaryColor}-500 text-2xl font-bold`}>
        this is a text
      </h3>
    </div>
  );
}
