"use client";

import Image from "next/image";

export default function Collection() {
  const listCollection = [
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pb-4 md:gap-6 pb-6">
      {listCollection?.map((item: string, index: number) => (
        <Image
          key={`${item}-${index}`}
          src={item}
          alt="image"
          width={300}
          height={300}
          className="w-auto h-auto rounded-lg"
        />
      ))}
    </div>
  );
}
