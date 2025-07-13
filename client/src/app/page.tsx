// app/page
"use client"
import HomeUI from "@/components/layouts/Home/HomeUI";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { user, isLoading, token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user && !token) {
      router.replace("/login")
    }
  },[user, isLoading, router, token])

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <SpinnerLoading />
      </div>
    )
  }

  if (!user){
    return null;
  }

  return (
    <HomeUI 
       user={user}
    />
  );
}
