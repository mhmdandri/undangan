"use client";
import React, { useEffect, useState } from "react";
import LoadingStore from "@/loadingStore";

type ReservationResponse = {
  data: {
    id: number;
    email: string;
    name: string;
    is_present: boolean;
    status: string;
    created_at: Date;
  }[];
  message: string;
};
const AttedancePage = () => {
  const [guest, setGuest] = useState<ReservationResponse["data"]>([]);
  const fetchData = async (): Promise<ReservationResponse> => {
    try {
      const res = await fetch("https://api.mohaproject.dev/api/reservations", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
      }
      const data: ReservationResponse = await res.json();
      setGuest(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const setLoading = LoadingStore((state) => state.setLoading);
  useEffect(() => {
    setLoading(false);
    fetchData();
    document.title = "Admin RSVP Detail";
  }, []);
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-center p-6">
          <h1 className="text-3xl font-extrabold tracking-wide text-red-600 drop-shadow-lg">
            RSVP Attendance
          </h1>
        </div>

        {/* Card Container */}
        <div className="max-w-md h-screen mx-auto p-5 border border-neutral-800 rounded-2xl shadow-2xl bg-neutral-900">
          <h2 className="text-xl font-bold mb-3">List Hadir</h2>

          {/* Guest Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-red-600 text-black uppercase">
                  <th className="rounded-tl-lg px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="rounded-tr-lg px-4 py-3">Jam Hadir</th>
                </tr>
              </thead>

              <tbody className="whitespace-nowrap">
                {guest.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-neutral-700 hover:bg-neutral-800 transition-all"
                  >
                    <td className="px-4 py-3 font-medium max-w-[140px] truncate">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 max-w-[180px] truncate">
                      {item.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md ${
                          item.status === "hadir"
                            ? "bg-green-600 text-black"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {item.status === "hadir" ? "Hadir" : "Belum Hadir"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleTimeString("en-GB")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer quote ala Netflix */}
        <p className="text-center text-neutral-500 text-xs mt-4 italic">
          “See who showed up for the show.”
        </p>
      </div>
    </>
  );
};

export default AttedancePage;
