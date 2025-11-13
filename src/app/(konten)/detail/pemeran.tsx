"use client";

import Image from "next/image";

export default function Pemeran() {
  const listPemeran = [
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
    <div className="flex flex-col gap-4 pb-4 md:gap-6 pb-6">
      {listPemeran?.map((item: string, index: number) => (
        <div key={index} className="gap-4 md:gap-6 flex items-center">
          <Image src={item} alt="image" width={300} height={300} className="w-[75px] md:w-[100px] h-auto rounded-full aspect-square" />
          <div className="flex flex-col">
            <div className="text-white text-sm md:text-base">Nama 1</div>
            <div className="text-gray-300 text-xs md:text-sm">Role 1</div>
          </div>
        </div>
      ))}
    </div>
  );
}
