'use client';
//import landing component
import {Landing} from "@/components/component/landing";
import { Profile } from "@/components/component/profile";
import { Verification } from "@/components/component/verification";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [idNum, setIdNum] = useState('');
  const [flagId, setFlagId] = useState(false);
  const [verifyFlag, setVerifyFlag] = useState(false);

  const handleVerification = (verifyData) => {
    if(verifyData){
      console.log("phone verified");
      setVerifyFlag(true);
    }
    else{
      setVerifyFlag(false);
    }
  }
  const handleInsert = (flagData) => {
    if(flagData){
      window.location.reload(); //reload page after sign in/sign out
    }
  }
  const handleData = (flagData, idData) => {
    if(flagData){ //login was successful
      setIdNum(idData);
      setFlagId(false);
      setIsLoggedIn(true); 
    }
    else  //login was not successful
      setFlagId(true); //alert user login failed
  }
  useEffect(() => {
  },[flagId]);
  useEffect(() => {
    if (isLoggedIn ) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        location.reload();
      }, 60000); // 30000 milliseconds = 30 seconds

      return () => clearInterval(timer);
    }
  
  }, [isLoggedIn]);
  return (
    <main>
      {flagId && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Error!</span> Your ID is not registered.
        </div>}
      {isLoggedIn ? (
        verifyFlag ? (
          <div>
            <p>Session closes in {countdown}s...</p>
            <Profile handleIdData={idNum} onDataInsert={handleInsert}/> {/*pass phone number*/}
          </div>
        ) : (
          <div>
            <p>Session closes in {countdown}s...</p>
            <Verification handleIdData={idNum} handleVerification={handleVerification}/> {/*receive phone*/}
          </div>
        )
      ) : (
        <Landing handleData={handleData} />
      )}
    </main>
  );
}
