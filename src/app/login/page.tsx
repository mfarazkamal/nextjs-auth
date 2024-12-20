"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post('api/users/login', user)
      console.log('Login Response',res.data);
      toast.success("Logged in successfully");
      router.push(`/profile`);
    } catch (error: any) {
      console.log("Error Found in Login Page", error);
      toast.error(error.message || "Something went wrong");
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else {
      setButtonDisabled(true)
    }
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-right" reverseOrder={true} toastOptions={{duration: 2000}}/>
      <h1 className="text-3xl tracking-widest uppercase font-bold">{loading ? "Loading..." : "Login Page"}</h1>
      <hr />
      <div>
        <div>
          <label
            htmlFor="email"
            className="text-md text-left bg-zinc-600 px-8 py-5 rounded mr-11 ml-2">
            Email
          </label>
          <input
            className="px-8 py-4 text-md text-zinc-800 rounded my-2"
            type="email"
            placeholder="Enter your Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-md text-left bg-emerald-600 px-8 py-5 rounded mx-2">
            Password
          </label>
          <input
            className="px-8 py-4 text-md text-zinc-800 rounded my-2 ml-2"
            type="password"
            placeholder="Enter your Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            id="password"
          />
        </div>
      </div>
      <button
        onClick={onLogin}
        className="px-8 py-4 text-md text-white bg-yellow-700 w-[10rem] hover:bg-blue-800 rounded my-2">
        {buttonDisabled? "Enter Details" : "Login"}
      </button>
      <p>Don't have an account? <Link href="/signup" className="hover:text-blue-500">Signup here</Link>
      </p>
    </div>
  );
}
