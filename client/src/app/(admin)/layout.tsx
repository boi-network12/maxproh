"use client";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";

interface SearchableChildProps {
  searchQuery: string;
}


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading, user, token } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!isLoading && !user && !token) {
            router.replace("/login")
        } else if (user?.role !== "admin"){
            router.replace("/")
        }
    },[user, isLoading, router, token])

    if (isLoading){
        return (
            <div  className="w-full min-h-screen flex items-center justify-center">
                <SpinnerLoading/>
            </div>
        )
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar onSearch={setSearchQuery} />
                <main className="flex-1 overflow-y-auto p-4">
                    {React.Children.map(children, (child) =>
                    React.isValidElement(child) && 'props' in child
                        ? React.cloneElement(child as React.ReactElement<SearchableChildProps>, {
                            searchQuery,
                        })
                        : child
                    )}
                </main>
            </div>
        </div>
    )
}
// (admin)/layout.tsx