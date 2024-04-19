
'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
export function Landing({handleData}) {
  const [idNum, setId] = useState('');
  const handleInput = (e) => {
    setId(e.target.value);
  };
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const formData = idNum;
      const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php?idNum=${formData}`);
      const resData = await reqData.json();
      console.log(resData);
      if(resData.message == "Invalid ID"){
        handleData(false, idNum);
      }
      else
        handleData(true, idNum);
    } catch (error) {
      console.error(error);
    } 
  };
  return (
    <form onSubmit={handleSubmit} className="grid items-center min-h-screen px-4 space-y-8 md:px-6 lg:space-y-12">
      <div
      className="grid items-center min-h-screen px-4 space-y-8 md:px-6 lg:space-y-12">
      <div className="space-y-4">
        <div className="flex justify-end w-half">
        <Link href='/login'>
        <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
        Sign in as admin
        </button>
        </Link>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">USC Contact Tracing App</h1>
          <p className="mt-2 text-sm text-gray-600 mt-5">Don't have an ID? 
          <Link href='/register' className="font-medium text-purple-600 hover:text-purple-500">
                Register here.
          </Link></p>
          
          <p className="text-gray-500 dark:text-gray-400">Enter your ID to sign in or sign out</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input type="text" name="idNum" placeholder="Enter your ID" value={idNum} onChange={handleInput} /> 
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit">Enter</Button>
        </div>
      </div>
    </div>
    </form>
  );
}
