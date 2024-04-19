'use client';
import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Registration({handleData}) {
  const [formValue,setFormValue] = useState({fName:'',mName:'',lName:'',profileRole:'',idNum:'',barangay:'',city:'',province:'',email:'',contactNo:''});
  const [idFlag, setIdFlag] = useState(false);
  const handleInput = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      let idNum = formValue.idNum;
      //generate id if account type is guest
      if (formValue.profileRole === 'Guest') {
        idNum = 'G' + Math.floor(Math.random() * 1000000); // Generate a random ID for guests
      }
      const formData = {fName: formValue.fName, mName: formValue.mName, lName: formValue.lName, profileRole: formValue.profileRole, idNum: idNum, barangay: formValue.barangay, city: formValue.city, province: formValue.province, email: formValue.email, contactNo: formValue.contactNo};
      const res = await axios.post('http://localhost/dogamo/usc-app/api/index.php?register', formData);
      if(res.data.message == "Data Inserted Successfully"){
        handleData(true, idNum); //register success
      }
      else{
        handleData(false, idNum); //register failed
        setIdFlag(true); //id exists
      }
      
    } catch (error) {
      console.error(error);
    } 
  };
  return (
    <form onSubmit={handleSubmit} className="grid items-center min-h-screen px-4 space-y-8 md:px-6 lg:space-y-12">
    <div
      className="grid items-center justify-center gap-12 min-h-screen px-4 md:px-6">
      <div className="flex flex-col gap-4">
        {idFlag && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Invalid!</span> Your ID already exists.
        </div>}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold">Register an account</h1>
          <p className="text-gray-500 dark:text-gray-400">Please enter your information and register</p>
        </div>
        <div className="space-y-4">
        <div className="space-y-2">
            <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="profileRole">Account type* </Label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="profileRole" value={formValue.profileRole} onChange={handleInput} required>
              <option value="">Select an option</option>
              <option value="Student" >Student</option>
              <option value="Faculty" >Faculty</option>
              <option value="Guest">Guest</option>
            </select>
        </div>
        { (formValue.profileRole === 'Student' || formValue.profileRole === 'Faculty') && (
          <div className="space-y-2">
            <Label htmlFor="id-number">ID number*</Label>
            <Input name="idNum" placeholder="ID number" value={formValue.idNum} onChange={handleInput}  required />
          </div>
        )}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fName">First name*</Label>
              <Input name="fName" placeholder="John" value={formValue.fName} onChange={handleInput} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mName" >Middle name*</Label>
              <Input name="mName" placeholder="Von" value={formValue.mName} onChange={handleInput}  required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lName">Last name*</Label>
              <Input name="lName" placeholder="Doe" value={formValue.lName} onChange={handleInput}  required/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="barangay">Barangay*</Label>
              <Input name="barangay" placeholder="123 Main" value={formValue.barangay} onChange={handleInput} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input name="city" placeholder="Cebu City" value={formValue.city} onChange={handleInput} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province*</Label>
              <Input name="province" placeholder="Cebu" value={formValue.province} onChange={handleInput}  required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input name="email" placeholder="m@example.com" required type="email" value={formValue.email} onChange={handleInput} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNo">Contact number*</Label>
            <Input name="contactNo" placeholder="01234567890" required value={formValue.contactNo} onChange={handleInput} />
          </div>
          <Button className="w-full">Register</Button>
        </div>
      </div>
    </div>
    </form>
  );
}
