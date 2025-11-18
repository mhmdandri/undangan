"use client";

import Image from "next/image";

export default function Collection() {
  const listCollection = [
    "/pemeran1.png",
    "/pemeran2.png",
    "/pemeran3.jpeg",
    "/pemeran4.jpeg",
    "/pemeran7.png",
    "/eps1.png",
    "/eps2.png",
    "/eps3.png",
    "/eps4.png",
    "/eps5.png",
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pb-4 md:gap-6">
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
