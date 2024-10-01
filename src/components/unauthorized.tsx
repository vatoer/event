"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Unauthorized = () => {
    return ( 
        <div>
        <h1>Not authorized, please contact Administrator</h1>
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>Login</Button>
      </div>
     );
}
 
export default Unauthorized;