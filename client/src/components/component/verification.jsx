import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useState, useEffect } from "react";


export function Verification({ handleIdData, handleVerification}) {
  const [userData,setUserData] = useState([]);
  const [userNumber, setUserNumber] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
  },[errorFlag])
  useEffect(() => {
    const getUserData = async () => {
      const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php?idNum=${handleIdData}`);
      const resData = await reqData.json();
      setUserData(resData);
      console.log(handleIdData);
    }
    getUserData();
  },[handleIdData]);
  const handleInput = (e) => {
    setUserNumber(e.target.value);
  };
  const verifyUser = async (e) => {
    try {
      const reqData = await fetch(`http://localhost/dogamo/usc-app/api/index.php?contact=${userNumber}`);
      const resData = await reqData.json();
      if((userNumber == resData.contactNo)||(userNumber == ('0' + resData.contactNo))){
        handleVerification(true);
        setErrorFlag(false);
      }
      else{
        handleVerification(false);
        setErrorFlag(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      {errorFlag && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Invalid!</span> Your number does not match.
        </div>}
      <CardContent className="p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify Your Id #{userData.idNum}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please enter your phone number to confirm this is your Id.
          </p>
        </div>
        <div className="space-y-2 my-8">
          <Label htmlFor="phone-number">Phone number</Label>
          <Input id="phone-number" placeholder="Enter your phone number" type="tel" value={userNumber} onChange={handleInput} required/>
        </div>
        <Button className="w-full" onClick={verifyUser}>Verify</Button>
      </CardContent>
    </Card>
  );
}
