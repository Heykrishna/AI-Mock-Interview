"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div style={{ height: "70px" }} className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image 
        src="/logo.svg" 
        width={160} 
        height={100} 
        alt="logo" 
        priority
        style={{ width: "160px", height: "100px" }}
      />

      <ul className="hidden md:flex gap-6">
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</li>
      </ul>

      {/* UserButton with more top space and right margin */}
      <div className="transform scale-125 mr-6 mt-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Header;

