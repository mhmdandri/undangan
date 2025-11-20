"use client";

import { SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@/utils/format";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Episode from "./episode";
import Collection from "./collection";
import Pemeran from "./pemeran";
import { toast } from "react-toastify";
import LoadingStore from "@/loadingStore";

export default function Detail() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [form, setForm] = useState<any>({
    name: "",
    message: "",
  });

  const tab = ["Episodes", "Collection", "Pemeran"];

  const color = [
    "#FF4B4B",
    "#FF9F1C",
    "#3A86FF",
    "#FFD60A",
    "#2ECC71",
    "#FF66B3",
    "#00FFFF",
    "#A259FF",
    "#FF6B6B",
    "#C0FF33",
  ];
  const defaultUcapan = [
    {
      nama: "Walter White",
      ucapan: "Stay out of my territory.",
      tanggal: "2025-02-02",
    },
    {
      nama: "Saul Goodman",
      ucapan: "if you're going to eat, eat like you mean it",
      tanggal: "2025-02-02",
    },
    { nama: "Heisenberg", ucapan: "Say my name", tanggal: "2025-05-02" },
    { nama: "Jesse Pinkman", ucapan: "Yeah, science!", tanggal: "2025-02-02" },
  ].map((item, index) => ({
    ...item,
    warna: color[index % color.length],
  }));

  const [ucapan, setUcapan] = useState<any[]>(defaultUcapan);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.mohaproject.dev/api/comments");
        const data = await res.json();
        const mappedData = data.data.map((item: any, index: number) => ({
          nama: item.name,
          ucapan: item.message,
          tanggal: item.created_at,
          warna: color[index % color.length],
        }));
        setUcapan(mappedData);
      } catch (err) {
        setErrorMessage("Gagal memuat ucapan" + err);
      }
    };
    fetchData();
  }, []);

  const hurufAwal = (value: string) => {
    return value[0].toUpperCase();
  };

  const singkatNama = (value: string) => {
    if (!value) {
      return "";
    } else {
      let temp = value.split(" ");
      if (temp?.length === 1) {
        return hurufAwal(temp[0]);
      } else {
        return hurufAwal(temp[0]) + hurufAwal(temp[1]);
      }
    }
  };

  const onSendUcapan = async () => {
    const payload = { ...form };
    try {
      setLoading(true);
      const res = await fetch("https://api.mohaproject.dev/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 429) {
        throw {
          code: data?.code ?? "RATELIMIT",
          error:
            data?.error ?? "Harap tunggu 1 menit sebelum mengirim ucapan lagi",
        };
      }

      if (!res.ok) {
        throw {
          code: data?.code,
          error: data?.error ?? "Terjadi kesalahan saat mengirim ucapan",
        };
      }
      const newUcapan = {
        nama: payload.name,
        ucapan: payload.message,
        tanggal: data?.data?.created_at ?? new Date().toISOString(),
        warna: color[Math.floor(Math.random() * color.length)],
      };
      setUcapan((prev) => [newUcapan, ...prev]);
      toast.success("Ucapan kamu telah dikirim");
      setForm({ name: "", message: "" });
    } catch (error: any) {
      toast.error(
        error?.error ??
          error?.message ??
          "Terjadi kesalahan saat mengirim ucapan"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    document.title = "Detail Undangan";
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-video mx-auto bg-linear-to-b from-neutral-900 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            src={"/video.mp4"}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            webkit-playsinline="true"
            className="w-full h-full object-cover"
          />
          {/* <Image src={"/dummy.png"} alt="dummy" height={100} width={100} className="w-full h-full object-cover" /> */}
          <div className="absolute top-4 right-4 z-10">
            <button
              className="bg-black bg-opacity-60 hover:bg-opacity-80 border border-white border-opacity-30 rounded-full p-2 transition-all flex justify-center items-center cursor-pointer"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-5 h-5 text-white" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 md:flex hidden flex-col gap-4 px-4 ">
            <div className="text-2xl md:text-4xl font-bold">
              John Doe & Jane Doe
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rapat+Tim+Frontend&dates=20251113T080000Z/20251113T090000Z&details=Diskusi+fitur+baru&location=Kantor+Pusat"
                  )
                }
              >
                <CalendarIcon className="w-6 h-6" /> 25/01/2025
              </button>
              <button
                className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-neutral-700 hover:bg-neutral-600 text-white px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/u3v4wtvmJ2i3pWn66",
                    "_blank"
                  )
                }
              >
                <MapPinIcon className="w-6 h-6" /> Gedung A
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="mt-4 mb-6 flex flex-col gap-2">
          <div className="text-2xl md:text-4xl font-bold md:hidden flex">
            John Doe & Jane Doe
          </div>
          <div className="flex gap-3 text-sm md:text-lg font-medium text-gray-300 items-center ">
            <div>2025</div>
            <div className="flex items-center justify-center rounded-md px-2 py-0.5 bg-neutral-800">
              SU
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 md:hidden mb-6">
          <button
            className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
            onClick={() =>
              window.open(
                "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rapat+Tim+Frontend&dates=20251113T080000Z/20251113T090000Z&details=Diskusi+fitur+baru&location=Kantor+Pusat"
              )
            }
          >
            <CalendarIcon className="w-6 h-6" /> 25/01/2025
          </button>
          <button
            className="flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-9 bg-neutral-700 hover:bg-neutral-600 text-white px-6 md:px-8 py-5 md:py-6 rounded gap-2 cursor-pointer"
            onClick={() =>
              window.open("https://maps.app.goo.gl/u3v4wtvmJ2i3pWn66", "_blank")
            }
          >
            <MapPinIcon className="w-6 h-6" /> Gedung A
          </button>
        </div>

        <div className="flex flex-col md:gap-2 gap-1 mb-8">
          <div className="text-neutral-300 md:text-lg text-[16px]">
            Setelah 5 tahun perjalanan penuh cinta, tawa, dan pertumbuhan
            bersama, kami dengan senang hati mengundang Anda untuk menyaksikan
            kami mengucapkan janji suci pernikahan.
          </div>
          <div className="text-neutral-400 md:text-[16px]">
            "Cinta sejati tidak ditemukan, tetapi dibangun. Kami membangun cinta
            kami satu hari pada satu waktu, satu kenangan pada satu waktu, satu
            janji pada satu waktu."
          </div>
        </div>

        <div className="relative">
          <div className="w-[calc(100vw-16px)] flex flex-col gap-1 border-t border-neutral-700 absolute left-0 right-0 -mx-4" />
          <div className="flex mb-2">
            {tab?.map((item: string, index: number) => (
              <div
                key={item}
                className={`text-base md:text-lg font-bold px-2 pb-2 cursor-pointer ${
                  index === selectedTab
                    ? "border-t-6 pt-2 border-red-netflix"
                    : "pt-3.5"
                }`}
                onClick={() => setSelectedTab(index)}
              >
                {item}
              </div>
            ))}
          </div>
          {selectedTab === 0 ? (
            <Episode />
          ) : selectedTab === 1 ? (
            <Collection />
          ) : (
            <Pemeran />
          )}
        </div>

        <div className="flex flex-col mb-8">
          <div className="text-base md:text-lg font-semibold flex gap-1 items-center mb-2 md:mb-4">
            Tulis Ucapan Anda{" "}
            <PencilSquareIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="input-custom"
              placeholder="Nama kamu"
              value={form?.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <textarea
              className="input-custom h-22!"
              placeholder="Tulis pesan kamu disini..."
              value={form?.message ?? ""}
              required
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              className="flex items-center mt-1 justify-center whitespace-nowrap cursor-pointer text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-6 rounded gap-2"
              onClick={onSendUcapan}
            >
              <PaperAirplaneIcon className="w-5 h-5" /> Kirim Ucapan
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-4 max-h-[400px] overflow-auto pr-2">
          {ucapan?.map((item: any, index: number) => (
            <div
              className="bg-neutral-900 rounded-lg p-4 border border-neutral-800 gap-2 flex"
              key={index}
            >
              <div
                className="w-10 h-10 rounded-full md:flex hidden justify-center items-center shadow-2xl"
                style={{ backgroundColor: item?.warna }}
              >
                {singkatNama(item?.nama)}
              </div>
              <div className="flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                  <div>{item?.nama}</div>
                  <div className="text-neutral-500 text-sm">
                    {formatDate(item.tanggal)}
                  </div>
                </div>
                <div className="text-neutral-300">{item?.ucapan}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-8 border-t border-neutral-800">
        <div className="text-neutral-400 md:text-lg">
          Sampai bertemu ya... 😁
        </div>
      </div>
    </div>
  );
}
