"use client"
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading && !user) {
      router.replace("/login")
    }
  },[user, isLoading, router])

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <SpinnerLoading/>
      </div>
    )
  }

  return (
    <div>
      
    </div>
  );
}
