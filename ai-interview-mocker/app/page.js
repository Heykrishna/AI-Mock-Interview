"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Check if we're already on /dashboard to avoid a loop
    if (window.location.pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [router]); // `router` is stable, so this runs once on mount

  return (
    <div>
      {/* <h2>Subscribe to Krishna!</h2>
      <Button>Subscribe</Button> */}
    </div>
  );
}