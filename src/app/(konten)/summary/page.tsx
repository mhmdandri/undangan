"use client";

import ModalCustom from "@/app/component/modal";
import ModalRsvpInput from "@/app/component/modal-rsvp-input";
import LoadingStore from "@/loadingStore";
import { PlayIcon, PlusIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { toast } from "react-toastify";
import pemeran from "@/utils/pemeran";

type Guest = {
  name: string;
  is_present: boolean;
  email: string;
  total_guests: number;
  status: string;
  code: number;
};

export default function Summary() {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const [showRSVP, setShowRSVP] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest>({
    name: "",
    is_present: false,
    email: "",
    total_guests: 0,
    status: "",
    code: 0,
  });

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
    {
      title: "Tanggal & Waktu",
      caption1: "Sabtu, 15 Maret 2025",
      caption2: "Pukul 14:00 WIB",
    },
    {
      title: "Lokasi",
      caption1: "Grand Ballroom",
      caption2: "Jakarta, Indonesia",
    },
  ];

  const imageStarring = [
    "/pemeran1.png",
    "/pemeran2.png",
    "/pemeran3.svg",
    "/pemeran4.svg",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
    "/dummy.png",
  ];
  const pemeranList = pemeran;

  const onSubmitRSVP = async (form: any) => {
    const payload = {
      ...form,
      total_guests: form.total_guests ? Number(form.total_guests) : 0,
    };
    payload.is_present = Boolean(form.is_present);
    try {
      setLoading(true);
      const res = await fetch("https://api.mohaproject.dev/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setGuest(data.data as Guest);
      if (!res.ok) {
        toast.error(data.error || data.message);
        return;
      }
      toast.success("Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.");
      setShowModal(true);
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    } finally {
      setLoading(false);
      setShowRSVP(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    document.title = "Summary Undangan";
  }, []);

  return (
    <div className="flex flex-col bg-black">
      {showRSVP && (
        <ModalCustom
          isOpen={showRSVP}
          onClose={() => setShowRSVP(false)}
          onSubmit={onSubmitRSVP}
        />
      )}
      {showModal && (
        <ModalRsvpInput
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={guest ?? ""}
        />
      )}

      <div className="relative w-full aspect-9/16 md:aspect-video max-h-[85dvh] md:max-h-[70dvh]">
        <Image
          src={"/prewed.png"}
          alt="foto"
          width={3840}
          height={2160}
          className="w-full h-full object-top object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 space-y-3 md:space-y-4">
          <div className="flex flex-col">
            <div className="text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-3 font-tegas text-white">
              The Wedding of
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 text-red-netflix font-tegas">
              John Doe & Jane Doe
            </div>
            <div className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 max-w-2xl">
              The wait is finally over. Join us for the season premiere of our
              new life together. A story of love, laughter, and happily ever
              after.
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  router.push("/detail");
                }}
              >
                <PlayIcon className="w-6 h-6" /> Watch Now
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
          <Carousel
            responsive={responsive}
            arrows
            partialVisbile
            className="pt-13 md:pt-16 absolute"
          >
            {pemeranList?.map((p, index: number) => (
              <div
                key={index}
                className={`aspect-square flex flex-col gap-1 md:gap-2 ${
                  index !== 0 && "pl-2 md:pl-4"
                }`}
              >
                <Image
                  src={p.image}
                  alt="dummy"
                  width={1920}
                  height={1080}
                  className={`w-full h-full object-cover object-top rounded-lg`}
                  draggable={false}
                />
                <div className="flex flex-col">
                  <div className="text-white text-sm md:text-base">
                    {p.name}
                  </div>
                  <div className="text-gray-300 text-xs md:text-sm">
                    {p.role}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6 md:py-8 flex md:flex-row flex-col gap-4 md:gap-6">
        {tanggalTempat?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-linear-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-lg border border-gray-700 w-full"
          >
            {index === 0 ? (
              <CalendarIcon className="w-8 h-8 md:h-10 md:w-10 mb-4 text-red-netflix" />
            ) : (
              <HeartIcon className="w-8 h-8 md:h-10 mb-4 text-red-netflix" />
            )}
            <div className="text-xl md:text-2xl mb-2">{item?.title}</div>
            <div className="text-gray-300 text-sm md:text-base">
              {item?.caption1}
            </div>
            <div className="text-gray-300 text-sm md:text-base">
              {item?.caption2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
