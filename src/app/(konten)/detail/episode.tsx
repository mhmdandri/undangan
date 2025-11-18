"use client";

import Image from "next/image";

export default function Episode() {
  const listEpisode = [
    {
      title: "1. Awal Perkenalan",
      time: "12 Februari 2022",
      image: "/eps1.png",
      deskripsi:
        "Pertama kali bertemu secara tidak sengaja di sebuah acara teman. Dari sekadar saling sapa, percakapan kecil itu berubah jadi pertemanan yang hangat.",
    },
    {
      title: "2. Mulai Saling Dekat",
      time: "5 Maret 2022",
      image: "/eps2.png",
      deskripsi:
        "Obrolan yang awalnya ringan mulai menjadi intens. Mereka mulai sering berbagi cerita dan menemukan kenyamanan satu sama lain.",
    },
    {
      title: "3. Kencan Pertama",
      time: "27 Maret 2022",
      image: "/eps3.png",
      deskripsi:
        "Hari spesial ketika mereka memutuskan untuk bertemu berdua. Perjalanan singkat, kopi hangat, dan tawa ringan membuat hari itu tak terlupakan.",
    },
    {
      title: "4. Resmi Berpacaran",
      time: "10 April 2022",
      image: "/eps4.png",
      deskripsi:
        "Setelah banyak berbagi momen bersama, mereka akhirnya memutuskan untuk menjalin hubungan yang lebih serius.",
    },
    {
      title: "5. Liburan Pertama",
      time: "18 Juni 2022",
      image: "/eps5.png",
      deskripsi:
        "Mereka melakukan perjalanan bersama untuk pertama kalinya. Momen ini menjadi pengalaman berharga yang membuat hubungan semakin erat.",
    },
    {
      title: "6. Bertemu Keluarga",
      time: "3 September 2022",
      image: "/eps6.png",
      deskripsi:
        "Momen penting ketika masing-masing keluarga mulai saling mengenal. Suasana hangat membuat semuanya berjalan lancar.",
    },
    {
      title: "7. Melewati Masa Sulit",
      time: "13 Januari 2023",
      image: "/eps7.png",
      deskripsi:
        "Tidak selalu mudah, namun masa sulit yang datang justru membuat mereka semakin kuat dan saling menghargai.",
    },
    {
      title: "8. Mulai Bahas Masa Depan",
      time: "7 Mei 2023",
      image: "/eps8.png",
      deskripsi:
        "Hubungan semakin matang. Mereka mulai membicarakan masa depan, cita-cita, dan rencana untuk hidup bersama.",
    },
    {
      title: "9. Lamaran",
      time: "12 Agustus 2023",
      image: "/eps9.png",
      deskripsi:
        "Hari penuh kebahagiaan ketika lamaran berlangsung. Keluarga berkumpul, doa dipanjatkan, dan semuanya terasa sangat spesial.",
    },
    {
      title: "10. Menuju Hari Pernikahan",
      time: "2024",
      image: "/eps10.png",
      deskripsi:
        "Segala persiapan dilakukan dengan penuh semangat. Mereka tak sabar untuk memulai babak baru sebagai pasangan suami istri.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-4 md:gap-6">
      {listEpisode?.map((item: any, index: number) => (
        <div className="flex flex-col gap-1" key={index}>
          <div className="flex gap-2 items-center">
            <Image
              src={item?.image}
              alt="image"
              width={150}
              height={300}
              className="aspect-video object-fill w-[150px] md:w-[250px]"
            />
            <div className="flex flex-col gap-1 md:w-full">
              <div className="flex flex-col md:flex-row md:w-full md:justify-between gap-1">
                <div className="text-base md:text-lg font-semibold">
                  {item?.title}
                </div>
                <div className="text-neutral md:text-white md:text-base">
                  {item?.time}
                </div>
              </div>
              <div className="text-neutral-400 md:text-base md:flex hidden">
                {item?.deskripsi}
              </div>
            </div>
          </div>
          <div className="text-neutral-400 md:text-base md:hidden">
            {item?.deskripsi}
          </div>
        </div>
      ))}
    </div>
  );
}
