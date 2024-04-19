'use server';
import { signIn } from '@/auth';

export const authenticate = async (prevState, formData) => {
    try {
      await signIn("credentials", formData);
    } catch (err) {
      console.log(err);
      if (err.type === "CredentialsSignin") {
        return "Wrong Credentials";
      }
      throw err;
    }
  };