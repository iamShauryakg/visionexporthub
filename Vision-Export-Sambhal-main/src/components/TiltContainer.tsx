import React from "react";
import { TiltContainerProps } from "../types";

export default function TiltContainer({ children, className, id }: TiltContainerProps) {
  return (
    <div
      className={`${className || ""} relative`}
      id={id}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
