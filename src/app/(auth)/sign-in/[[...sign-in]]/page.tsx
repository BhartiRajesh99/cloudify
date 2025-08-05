import { SignIn } from "@clerk/nextjs";
import React from "react";

function Signin() {
  return (
    <div className="flex py-20 justify-center items-center min-h-screen w-full">
      <SignIn />
    </div>
  );
}

export default Signin;
