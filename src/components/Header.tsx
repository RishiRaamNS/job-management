"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import CreateJob from "./CreateJob";

function Header() {
  return (
    <div
      className="flex gap-x-10 my-8 w-fit border border-[#FCFCFC] mx-auto  py-6 rounded-[122px] px-6 font-semibold items-center"
      style={{ boxShadow: "0 0 20px rgba(127, 127, 127, 0.15)" }}
    >
      <img
        src="https://img.logo.dev/cybermindworks.com?token=pk_JxMj4KHhSEedhL9_0LOJIw&format=png&retina=true"
        alt="logo"
        width={40}
        height={40}
      />
      <Link href="/">Home</Link>
      <Link href="/">Find Jobs</Link>
      <Link href="/">Find Talents</Link>
      <Link href="/">About us</Link>
      <Link href="/">Testimonials</Link>
      <CreateJob />
    </div>
  );
}

export default Header;
