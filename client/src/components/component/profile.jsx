
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import axios from "axios";
export function Profile({handleIdData, onDataInsert}) {
  const [userData,setUserData] = useState([]);
  const [signedInFlag, setSignedInFlag] = useState(false);
  const [signedOutFlag, setSignedOutFlag] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php/profile/${encodeURIComponent(handleIdData)}`);
      const resData = await reqData.json();
      setUserData(resData);
    }
    getUserData();
  },[handleIdData]);
  useEffect(() => {
  }, [signedInFlag, signedOutFlag, successFlag]);
  const handleSignIn = async (e) =>{
    try{
      e.preventDefault();
      const date = new Date();
      const datePart = date.toLocaleDateString('sv-SE'); // 'sv-SE' locale results in 'YYYY-MM-DD' format
      const timePart = date.toLocaleTimeString('it-IT'); // 'it-IT' locale results in 'HH:MM:SS' format
      const timeStamp = `${datePart} ${timePart}`;
      const profileData = {idNum: handleIdData, checkIn: timeStamp};
      const res = await axios.post('http://localhost/dogamo/usc-app/api/index.php?signin=true', profileData);
      console.log(res);
      if(res.data.message == "Data Inserted Successfully"){
        onDataInsert(true); // dismiss profile window
        setSuccessFlag(true); //flag sign in success alert
        setSignedInFlag(false); 
      }
      else{
        onDataInsert(false); 
        setSuccessFlag(false);
        setSignedInFlag(true); //flag already signed in alert
      }
      
    } catch (error) {
      console.error(error);
    } 
  };
  const handleSignOut = async (e) =>{
    try{
      e.preventDefault();
      const date = new Date();
      const datePart = date.toLocaleDateString('sv-SE'); // 'sv-SE' locale results in 'YYYY-MM-DD' format
      const timePart = date.toLocaleTimeString('it-IT'); // 'it-IT' locale results in 'HH:MM:SS' format
      const timeStamp = `${datePart} ${timePart}`;
      const profileData = {idNum: handleIdData, checkOut: timeStamp};
      const res = await axios.post('http://localhost/dogamo//usc-app/api/index.php?signout=true', profileData);
      if(res.data.message == "Data Inserted Successfully"){
        onDataInsert(true); 
        setSuccessFlag(true); //flag sign out success alert
        setSignedOutFlag(false);
      }
      else{
        onDataInsert(false);
        setSuccessFlag(false);
        setSignedOutFlag(true); //flag not yet signed in alert
      }
      
    } catch (error) {
      console.error(error);
    } 
  };
  return (
    (<Card className="w-full max-w-md mx-auto">
      {successFlag && <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span class="font-medium">Success!</span> Thank you for visiting USC!
      </div>}
       {signedInFlag && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Error!</span> You already signed in.
        </div>}
        {signedOutFlag && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Error!</span> You need to sign in first.
        </div>}
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold leading-none">Welcome to USC, {userData.fName}!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">User information</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
      {userData.profileRole == "Guest" && <div className="font-semibold text-red-600">Please save the following ID for future use.</div>}
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-semibold">ID</div>
          <div>{userData.idNum}</div>
          <div className="font-semibold">First Name</div>
          <div>{userData.fName}</div>
          <div className="font-semibold">Middle Name</div>
          <div>{userData.mName}</div>
          <div className="font-semibold">Last Name</div>
          <div>{userData.lName}</div>
          <div className="font-semibold">Address</div>
          <div>{userData.barangay + ", " + userData.city + ", " + userData.province}</div>
          <div className="font-semibold">Email</div>
          <div>{userData.email}</div>
          <div className="font-semibold">Contact</div>
          <div>{userData.contactNo}</div>
        </dl>
      </CardContent>
      <CardFooter className="p-4 flex">
        <Button className="flex-1" variant="outline" onClick={handleSignIn}>
          Sign in
        </Button>
        <Button className="flex-1" variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </CardFooter>
    </Card>)
  );
}
