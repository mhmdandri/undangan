"use client";

import Image from "next/image";

export default function Episode() {
  const listEpisode = [
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
    { title: "1. Perkenalan", time: "12 Februari 2022", image: "/dummy.png", deskripsi: "apa ajaaaa" },
  ];

  return (
    <div className="flex flex-col gap-4 pb-4 md:gap-6 pb-6">
      {listEpisode?.map((item: any, index: number) => (
        <div className="flex flex-col gap-1" key={index}>
          <div className="flex gap-2 items-center">
            <Image src={item?.image} alt="image" width={150} height={300} className="aspect-video object-cover w-[150px] md:w-[250px]" />
            <div className="flex flex-col gap-1 md:w-full">
              <div className="flex flex-col md:flex-row md:w-full md:justify-between gap-1">
                <div className="text-base md:text-lg font-semibold">{item?.title}</div>
                <div className="text-neutral md:text-white md:text-base">{item?.time}</div>
              </div>
              <div className="text-neutral-400 md:text-base md:flex hidden">{item?.deskripsi}</div>
            </div>
          </div>
          <div className="text-neutral-400 md:text-base md:hidden">{item?.deskripsi}</div>
        </div>
      ))}
    </div>
  );
}
