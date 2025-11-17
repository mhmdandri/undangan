"use client";
import React, { useEffect, useRef, useState } from "react";
import LoadingStore from "@/loadingStore";
import { useRouter } from "next/navigation";
import ModalRsvp from "@/app/component/modal-rsvp";

type Guest = {
  name: string;
  is_present: boolean;
  email: string;
  total_guests: number;
  status: string;
};

const RsvpConfirmPage = () => {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest>({
    name: "",
    is_present: false,
    email: "",
    total_guests: 0,
    status: "",
  });
  useEffect(() => {
    setLoading(false);
  }, []);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/rsvp/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setGuest(data.data as Guest);
      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        setOpenModal(true);
        setSuccessMessage(data.message);
        setCode("");
      }
    } catch (error) {
      setErrorMessage("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/login");
  };
  const closeModal = () => {
    setOpenModal(false);
    router.refresh();
    setErrorMessage("");
    setSuccessMessage("");
  };
  return (
    <>
      <ModalRsvp isOpen={openModal} onClose={closeModal} data={guest ?? ""} />
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-between items-center text-center mt-5">
            <div>
              <h2 className="text-2xl/9 font-bold tracking-tight text-white">
                Input Kehadiran
              </h2>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center whitespace-nowrap cursor-pointer text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-4 md:py-4 rounded gap-2 w-full"
              >
                Logout
              </button>
            </div>
          </div>
          {(errorMessage || successMessage) && (
            <div
              className={`py-2 px-4 text-sm ${
                successMessage
                  ? "text-green-800 bg-green-50"
                  : "text-red-800 bg-red-50"
              } rounded-lg mt-3`}
              role="alert"
            >
              {successMessage || errorMessage}
            </div>
          )}
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Kode Undangan
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="number"
                  required
                  autoComplete="code"
                  className="input-custom"
                  placeholder="123456"
                  value={code ?? ""}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex items-center mt-1 justify-center whitespace-nowrap cursor-pointer text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-2 rounded gap-2 w-full"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RsvpConfirmPage;
