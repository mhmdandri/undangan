"use client";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Guest = {
  name: string;
  is_present: boolean;
  total_guests: number;
  status: string;
};

export default function ModalRsvp({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: Guest;
}) {
  const { name, status, total_guests } = data;

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
          <h2 className="font-bold text-lg md:text-xl">Kode RSVP Berhasil!</h2>
          <XMarkIcon
            className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col gap-3 text-white">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold align-top whitespace-nowrap pr-2">
                  Nama
                </td>
                <td className="align-top">: {name ?? ""}</td>
              </tr>
              <tr>
                <td className="font-semibold align-top whitespace-nowrap pr-2">
                  Status Kehadiran
                </td>
                <td className="align-top">: {status ?? ""}</td>
              </tr>
              <tr>
                <td className="font-semibold align-top whitespace-nowrap pr-2">
                  Jumlah Tamu
                </td>
                <td className="align-top">: {total_guests ?? ""}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={onClose}
            className="p-3 mt-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}
