'use client';
import {Registration} from "@/components/component/registration";
import { Profile } from "@/components/component/profile";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function registerPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [idNum, setIdNum] = useState('');
  const router = useRouter();
  const handleData = (flagData, idData) => {
    if(flagData){
      setIdNum(idData);
      setIsRegistered(true);
    }
    else
      setIsRegistered(false);
  }
  const handleInsert = (flagData) => {
    if(flagData){
      router.push('/'); //redirect to root page
    }
  }
  useEffect(() => {
    if (isRegistered) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        router.push('/'); //redirect to root page
      }, 30000); // 30000 milliseconds = 30 seconds

      return () => clearInterval(timer);
    }
  }, [isRegistered]);
    return (
        <main>
          {isRegistered? (
          <div>
            <p>Session restarts in {countdown}s...</p>
            <Profile handleIdData={idNum} onDataInsert={handleInsert}/>
          </div>) : (
          <Registration handleData={handleData}/>
        )}
        </main>
     
      );
  }