"use client";
import axios from "axios";
import { NextResponse } from "next/server";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState('No User Found');
  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      toast.success("Logged out successfully");
      router.push('/login');
      return res;
    } catch (error:any) {
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }

  const getUserDetails = async ()=>{
    const res = await axios.get('/api/users/me')
    console.log(res.data._id);
    setUser(res.data.username);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <Toaster position="top-right" reverseOrder={true} toastOptions={{duration: 2000}}/>
      <h1 className="text-3xl tracking-widest uppercase font-bold">Profile Page</h1>
      <h2 className="text-2xl bg-cyan-800 px-8 py-2 my-3 rounded">{user === 'No User Found' ? 'No User Found' : <Link href={`/profile/${user}`}>{user}</Link>}</h2>
      <button onClick={getUserDetails} className="bg-green-800 py-2 px-4 rounded text-white">Get the Details</button>
      <button onClick={logout} className="bg-red-500 absolute top-4 right-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    </div>
  );
}
