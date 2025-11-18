"use client";

import pemeran from "@/utils/pemeran";
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
  ];
  const pemeranList = pemeran;
  return (
    <div className="flex flex-col gap-4 pb-6 md:gap-6 lg:flex-row lg:flex-wrap lg:justify-center">
      {pemeranList?.map((p, index: number) => (
        <div key={index} className="gap-4 md:gap-6 flex items-center lg:w-1/6">
          <Image
            src={p.image}
            alt="image"
            width={300}
            height={300}
            className="w-[75px] md:w-[100px] h-auto rounded-full aspect-square"
          />
          <div className="flex flex-col">
            <div className="text-white text-sm md:text-base">{p.name}</div>
            <div className="text-gray-300 text-xs md:text-sm">{p.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
