"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl tracking-widest uppercase font-bold">
        Verify Email
      </h1>
      <h2 className="text-2xl bg-cyan-800 px-8 py-2 my-3 rounded">
        {token ? `${token}` : `No Token Found`}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl bg-cyan-800 px-8 py-2 my-3 rounded">
            Email verified successfully
          </h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      
      {error && (
        <div>
          <h2 className="text-2xl bg-cyan-800 px-8 py-2 my-3 rounded">
            Error in verifying email
          </h2>
          <Link href={"/signup"}>Signup</Link>
        </div>
      )}
    </div>
  );
}
