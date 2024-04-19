'use client';
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { fetchUsers, fetchUser } from "@/lib/data"
import { useEffect, useState } from "react"

export function Dboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const handleInput = (e) =>{
    setSearch(e.target.value);
  }
  const handleRequest = async (e) => {
    e.preventDefault();
    const res = await fetchUser(search);
    setUsers(res);
  }
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, [])
  return (
    (<div className="flex flex-col w-full min-h-screen">
      <div
        className="border-r bg-gray-100/40 dark:bg-gray-800/40 border-gray-200 flex flex-col gap-2">
        <header className="flex h-[60px] items-center px-6">
            <Package2Icon className="h-6 w-6" />
            <span className="">USC Contact Tracer Dashboard</span>
        </header>
      </div>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-800">
        <header
          className="flex h-14 items-center gap-4 border-b border-gray-200 bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <form className="flex-1" onSubmit={handleRequest}>
            <Input
              className="w-full sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search members..."
              name="search"
              type="search" value={search} onChange={handleInput}/>
          </form>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-6"> 
          {users.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">ID</TableHead>
                  <TableHead className="hidden sm:table-cell px-8">Role</TableHead>
                  <TableHead className="hidden sm:table-cell">First Name</TableHead>
                  <TableHead className="hidden sm:table-cell px-8">Middle Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Last Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Contact No.</TableHead>
                  <TableHead className="hidden md:table-cell">Barangay</TableHead>
                  <TableHead className="hidden md:table-cell">City</TableHead>
                  <TableHead className="hidden md:table-cell">Province</TableHead>
                  <TableHead className="text-right">Time-In</TableHead>
                  <TableHead className="text-right">Time-Out</TableHead>        
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user,index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-900 text-wrap dark:text-white">{user.idNum}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.profileRole}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.fName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.mName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.lName}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.contactNo}</TableCell>
                    <TableCell className="text-left">{user.barangay}</TableCell>
                    <TableCell className="text-left">{user.city}</TableCell>
                    <TableCell className="text-left">{user.province}</TableCell>
                    <TableCell className="text-left text-green-500">{user.checkIn}</TableCell>
                    <TableCell className="text-left text-red-500">{user.checkOut}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead className="hidden sm:table-cell">First Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Middle Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Last Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Contact No.</TableHead>
                    <TableHead className="text-right">Barangay</TableHead>
                    <TableHead className="text-right">City</TableHead>
                    <TableHead className="text-right">Province</TableHead>
                    <TableHead className="text-right">Time-In</TableHead>
                    <TableHead className="text-right">Time-Out</TableHead>        
                  </TableRow>
                </TableHeader>
                </Table>
                <p>No search results found</p>
                </div>
          )}
        </main>
      </div>
    </div>)
  );
}

function MoreHorizontalIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>)
  );
}


function Package2Icon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>)
  );
}
