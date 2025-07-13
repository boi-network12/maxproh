import { AuthUser } from '@/types/auth'
import React from 'react'
import Image from 'next/image'
import backgroundImage from "@/assets/54804.png"
import { BiPlus } from "react-icons/bi"

interface DashboardCardProps {
  user: AuthUser;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ user }) => {
  return (
    <div className="relative w-[90%] max-w-screen-xl rounded-xl overflow-hidden text-white p-6">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt="Dashboard Background"
        fill
        className="absolute inset-0 object-cover z-0"
      />

      {/* Overlay (optional for better contrast) */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20">
        <h1 className="text-3xl font-bold">
          ₦ {Intl.NumberFormat().format(user?.accountBalance)}
        </h1>
        <div className="mt-4">
            <button
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-md"
            >
                <BiPlus className="text-xl" />
                <span className="text-sm font-medium">Add Funds</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
