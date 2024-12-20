"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)
  
  const onSignUp = async () => {
    try {
      setLoading(true)
      const res = await axios.post('api/users/signup', user)
      console.log('Signup Response',res.data);
      toast.success("User created successfully");
      router.push('/login');
      
    } catch (error:any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else {
      setButtonDisabled(true)
    }
  },[user])
  
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-right" reverseOrder={true} toastOptions={{duration: 2000}}/>
      <h1 className="text-3xl tracking-widest uppercase font-bold">{loading? "Processing" : "Sign Up"}</h1>
      <hr />
      <div>
        <div>
          <label
            htmlFor="username"
            className="text-md text-left bg-slate-600 px-8 py-5 rounded mx-2">
            Username
          </label>
          <input
            className="px-8 py-4 text-md text-zinc-800 rounded my-2"
            type="text"
            placeholder="Enter your Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            id="username"
          />
        </div>

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
        onClick={onSignUp}
        className="px-8 py-4 text-md text-white bg-yellow-700 w-[10rem] hover:bg-blue-800 rounded my-2">
        {buttonDisabled? "Enter Details" : "Sign Up"}
      </button>
      <p>Already have an account? <Link href="/login" className="hover:text-blue-500">Login here</Link>
      </p>
    </div>
  );
}
