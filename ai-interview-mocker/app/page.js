"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router=useRouter();
  useEffect(()=>{
    router.push("/dashboard");
  },[router])
  return (
    <div>
      <h2>Subscribe to Krishna !</h2>
      <Button>Subscribe</Button>
    </div>
  )
}
