"use client";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { code } from "motion/react-client";

type Guest = {
  name: string;
  is_present: boolean;
  total_guests: number;
  status: string;
  code: number;
};

export default function ModalRsvpInput({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: Guest;
}) {
  const { name, status, total_guests, code } = data;
  let statusRead = "";
  if (status === "hadir") {
    statusRead = "Datang";
  } else {
    statusRead = "Tidak Datang";
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      focusTrapped={false}
      showCloseIcon={false}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start pb-4">
          <h2 className="font-bold text-lg md:text-xl">
            Terimakasih sudah bersedia hadir yaa!
          </h2>
          <XMarkIcon
            className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-3 text-white">
          <p>Simpan kode dibawah agar dapat souvenier menarik:</p>
          <div className="flex justify-start text-left">
            <div className="w-1/4">Nama</div>
            <div>{name}</div>
          </div>
          <div className="flex justify-start text-left">
            <div className="w-1/4">Status</div>
            <div>{statusRead}</div>
          </div>
          <div className="flex justify-start text-left">
            <div className="w-1/4">Jumlah Tamu</div>
            <div>{total_guests}</div>
          </div>
          <div className="flex justify-start text-left">
            <div className="w-1/4">Kode Undangan</div>
            <div className="font-bold">{code}</div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-2 mt-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}
