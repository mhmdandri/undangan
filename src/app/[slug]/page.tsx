"use client";
import LoadingStore from "@/loadingStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const params = useParams();

  useEffect(() => {
    setLoading(false);
    document.title = "Wedding of John Doe & Jane Doe";
  }, []);

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-black">
      <div className="flex flex-col justify-center gap-8 items-center">
        <div className="text-4xl lg:text-6xl text-white font-light">{`Who's Watching?`}</div>
        <div className="flex gap-4 lg:gap-8 items-center text-gray-400">
          <div
            className="space-y-2 group hover:text-white cursor-pointer"
            onClick={() => {
              setLoading(true);
              router.push(`https://weddingof.mohaproject.dev/${params.slug}`);
            }}
          >
            <Image
              src={"/avatar.jpg"}
              alt="profile"
              width={96}
              height={96}
              className="rounded-lg max-h-[200px] max-w-[200px] min-h-24 min-w-[96px] w-[10vw] object-cover group-hover:border group-hover:border-white"
            />
            <div className="text-lg lg:text-xl text-center">Jane</div>
          </div>
          <div
            className="space-y-2 group hover:text-white cursor-pointer"
            onClick={() => {
              setLoading(true);
              router.push("/summary");
            }}
          >
            <Image
              src={"/profile.jpg"}
              alt="profile"
              width={96}
              height={96}
              className="rounded-lg max-h-[200px] max-w-[200px] min-h-24 min-w-[96px] w-[10vw] object-cover group-hover:border group-hover:border-white"
            />
            <div className="text-lg lg:text-xl text-center">John</div>
          </div>
        </div>
      </div>
    </div>
  );
}
