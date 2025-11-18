"use client";
import LoadingStore from "@/loadingStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setLoading(false);
    document.title = "Login Admin";
  }, []);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Login failed");
      } else {
        router.push("/rsvp/confirm");
      }
    } catch (error) {
      setErrorMessage("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="logo-new"
          src="/logo-new.png"
          width={240}
          height={240}
          className="mx-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in
        </h2>
        {errorMessage && (
          <div
            className="py-2 px-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitForm} method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-custom"
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input-custom"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center mt-1 justify-center whitespace-nowrap cursor-pointer text-sm font-medium transition-all h-9 bg-white hover:bg-gray-200 text-black px-6 md:px-8 py-5 md:py-2 rounded gap-2 w-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
