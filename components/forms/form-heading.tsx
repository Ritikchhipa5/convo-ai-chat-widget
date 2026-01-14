import { IMAGES } from "@/assets";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description?: string;
};
function FormHeading({ title, description }: Props) {
  return (
    <div className="text-center ">
      <div className="flex justify-center mb-4">
        <Image
          src={IMAGES.LOGO.src}
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "10%",
            height: "auto",
          }}
          className="rounded"
          width={0}
          height={0}
        />
      </div>
      <h1 className="text-2xl text-black font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FormHeading;
