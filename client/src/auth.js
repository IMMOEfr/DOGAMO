import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './authconfig';
import bcrypt from 'bcryptjs-react';
 
const login = async (credentials) => {
  try {
    const reqUser = await fetch(`http://localhost/dogamo/usc-app/api/index.php?email=${credentials.email}`);
    const user = await reqUser.json();
    if(user.message == "User not found"){
      throw new Error("Wrong credentials!");
    }
    console.log(user.password);
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    return user;
  } catch (error) {
      console.log(error);
      throw new Error("Login failed");
  }
};
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);  
          console.log(user);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
 secret: process.env.AUTH_SECRET || 'secret',
});
