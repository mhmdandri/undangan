"use client";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ModalCustom({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    nama: "",
    kehadiran: "",
    jumlah: "",
    no: "",
  });

  const option = [
    { label: "Hadir", value: true },
    { label: "Tidak Hadir", value: false },
  ];

  const formField = [
    { label: "Nama", type: "text", placeholder: "Masukkan nama anda", name: "nama" },
    { label: "Kehadiran", type: "radio", name: "kehadiran" },
    { label: "Jika ya, berapa orang yang akan hadir?", type: "number", placeholder: "Contoh: 2", name: "jumlah" },
    { label: "No. WA", type: "number", placeholder: "Contoh: 081234567890", name: "no" },
  ];

  useEffect(() => {
    if (isOpen) {
      setForm({ nama: "", kehadiran: "", jumlah: "", no: "" });
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={onClose} center focusTrapped={false} showCloseIcon={false}>
      <div className="flex flex-col">
        <div className="flex justify-between items-start pb-4">
          <div className="font-bold text-lg md:text-xl">Konfirmasi Kehadiran</div>
          <XMarkIcon className="w-5 h-5 text-white cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col gap-3">
          {formField?.map((item: any, index: number) => (
            <div className="flex flex-col gap-1" key={index}>
              <div className="md:text-base">{item?.label}</div>
              {item?.type === "radio" ? (
                <div className="flex gap-3">
                  {option?.map((item: any, index: number) => (
                    <div key={index} className="flex gap-1 items-center cursor-pointer" onClick={() => setForm({ ...form, kehadiran: item?.value })}>
                      <div
                        className={`w-4 h-4 rounded-full ${
                          item?.value === form?.kehadiran
                            ? "outline outline-red-netflix bg-red-netflix border-2 border-white"
                            : "outline-neutral-700 bg-zinc-800"
                        }`}
                      />
                      {item?.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    className="input-custom bg-zinc-800!"
                    placeholder={item?.placeholder}
                    value={(form as any)[item?.name]}
                    onChange={(e) => setForm({ ...form, [item?.name]: e.target.value })}
                    type={item?.type}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            className="p-3 mt-2 cursor-pointer rounded-lg bg-red-netflix text-white font-semibold flex items-center justify-center hover:bg-[#c5000a] disabled:bg-gray-400 disabled:cursor-no-drop"
            disabled={!form?.jumlah || !form?.nama || !form?.no || form?.kehadiran === ""}
            onClick={() => onSubmit(form)}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
