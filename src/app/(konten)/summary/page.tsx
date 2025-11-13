"use client";

import ModalCustom from "@/app/component/modal";
import LoadingStore from "@/loadingStore";
import { PlayIcon, PlusIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { toast } from "react-toastify";

export default function Summary() {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const [showRSVP, setShowRSVP] = useState<boolean>(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 3,
      partialVisibilityGutter: 10,
    },
  };

  const tanggalTempat = [
    { title: "Tanggal & Waktu", caption1: "Sabtu, 15 Maret 2025", caption2: "Pukul 14:00 WIB" },
    { title: "Lokasi", caption1: "Grand Ballroom", caption2: "Jakarta, Indonesia" },
  ];

  const imageStarring = [
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

  const onSubmitRSVP = (form: any) => {
    toast.success("Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.");
    setShowRSVP(false);
    console.log("coba", form);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col bg-black">
      {showRSVP && <ModalCustom isOpen={showRSVP} onClose={() => setShowRSVP(false)} onSubmit={onSubmitRSVP} />}

      <div className="relative w-full aspect-[9/16] md:aspect-[16/9] max-h-[85dvh] md:max-h-[70dvh]">
        <Image src={"/dummy.png"} alt="dummy" width={100} height={100} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 space-y-3 md:space-y-4">
          <div className="flex flex-col">
            <div className="text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-3 font-tegas text-white">The Wedding of</div>
            <div className="text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-red-netflix font-tegas">Andri & Cica</div>
            <div className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 max-w-2xl">
              Bergabunglah dengan kami dalam merayakan hari istimewa kami. Sebuah kisah cinta yang indah, sebuah perjalanan yang tak terlupakan.
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  router.push("/detail");
                }}
              >
                <PlayIcon className="w-6 h-6" /> Buka Undangan
              </button>
              <button
                className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-gray-600/80 hover:bg-gray-600 text-white px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
                onClick={() => setShowRSVP(true)}
              >
                <PlusIcon className="w-6 h-6" /> RSVP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6 md:py-8">
        <div className="relative">
          <div className="text-xl md:text-2xl text-white absolute">Pemeran</div>
          <Carousel responsive={responsive} arrows partialVisbile className="pt-13 md:pt-16 absolute">
            {imageStarring?.map((item: string, index: number) => (
              <div key={index} className={`aspect-square flex flex-col gap-1 md:gap-2 ${index !== 0 && "pl-2 md:pl-4"}`}>
                <Image src={item} alt="dummy" width={100} height={100} className={`w-full h-full object-cover rounded-lg`} draggable={false} />
                <div className="flex flex-col">
                  <div className="text-white text-sm md:text-base">Nama 1</div>
                  <div className="text-gray-300 text-xs md:text-sm">Role 1</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6 md:py-8 flex md:flex-row flex-col gap-4 md:gap-6">
        {tanggalTempat?.map((item: any, index: number) => (
          <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-lg border border-gray-700 w-full">
            {index === 0 ? (
              <CalendarIcon className="w-8 h-8 md:h-10 md:w-10 mb-4 text-red-netflix" />
            ) : (
              <HeartIcon className="w-8 h-8 md:h-10 md:h-10 mb-4 text-red-netflix" />
            )}
            <div className="text-xl md:text-2xl mb-2">{item?.title}</div>
            <div className="text-gray-300 text-sm md:text-base">{item?.caption1}</div>
            <div className="text-gray-300 text-sm md:text-base">{item?.caption2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
