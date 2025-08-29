import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string
    phone: string
  }
  
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}