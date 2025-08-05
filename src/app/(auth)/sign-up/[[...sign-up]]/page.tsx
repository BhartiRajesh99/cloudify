import { SignUp } from "@clerk/nextjs";
import React from "react";

function Signup() {
  return (
    <div className="flex py-10 justify-center items-center min-h-screen w-full">
      <SignUp />
    </div>
  );
}

export default Signup;
