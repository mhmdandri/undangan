"use client";

import Image from "next/image";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import localeData from "dayjs/plugin/localeData.js";
import id from "dayjs/locale/id.js";
import { ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import LoadingStore from "@/loadingStore";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.locale(id);

export default function LayoutKonten({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const setLoading = LoadingStore((state) => state.setLoading);

  return (
    <div className="w-full h-[100dvh]">
      <ToastContainer
        closeButton={false}
        toastClassName={"toastify"}
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="sticky top-0 bg-black w-full px-4 py-3 md:px-6 md:py-4">
        {pathname === "/login" ? null : (
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-auto h-8 cursor-pointer"
            onClick={() => {
              if (pathname !== "/summary") {
                setLoading(true);
                router.push("/summary");
              }
            }}
          />
        )}
      </div>
      <div className="overflow-auto bg-black">{children}</div>
    </div>
  );
}
