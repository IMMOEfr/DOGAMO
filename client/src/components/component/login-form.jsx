'use client';
import {useFormState} from 'react-dom';
import { authenticate } from '@/lib/actions';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
   
    return (
      <form action={dispatch} className="grid items-center min-h-screen px-4 space-y-8 md:px-6 lg:space-y-12">
      <div
        className="grid items-center justify-center gap-12 min-h-screen px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold">Login as admin</h1>
            <p className="text-gray-500 dark:text-gray-400">Please enter your login details</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"  minLength={6}/>
            </div>
            <Button className="w-full">Login</Button>
            <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
          </div>
        </div>
      </div>
      </form>
    );
  }