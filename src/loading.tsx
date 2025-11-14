"use client";
import * as motion from "motion/react-client";
import { FadeLoader, PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center z-99999 w-100dvw h-100dvh bg-black opacity-85 inset-x-0 inset-y-0 absolute">
      <div className="absolute">
        {/* <motion.img
          src={"/logo.png"}
          initial={{ y: 0 }}
          animate={{ y: [0, 20, 0] }}
          transition={{
            repeat: Infinity,
          }}
          className="w-[300px] max-w-[80vw]"
        /> */}
        {/* <PacmanLoader size={60} color="#e50914" /> */}
        <FadeLoader color="#e50914" />
      </div>
    </div>
  );
}
