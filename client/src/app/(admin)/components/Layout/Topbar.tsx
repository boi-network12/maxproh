import React, { useState } from "react";
import Image from "next/image";
import { BellDot } from "lucide-react";
import { Input } from "@/components/ui/input";
import Avatar from "@/assets/avatar-empty.png"
import { usePathname } from "next/navigation";

interface TopbarProps {
  onSearch?: (query: string) => void;
}

export default function Topbar({ onSearch }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  }

  const getPlaceholder = () => {
    if (pathname.includes("/admin/users")) {
      return "Search users by name or email...";
    } else if (pathname.includes("/admin")) {
      return "search for budget"
    } else if (pathname.includes("/admin/setting")) {
      return "search for setting"
    }
    return "Search...";
  };

  return (
    <header className="w-full bg-white px-4 py-3 shadow-sm flex items-center justify-between">
      {/* <div className="text-lg font-semibold"></div> */}
      <div className=" mx-4">
        <Input 
           type="text" 
           placeholder={getPlaceholder()} 
           value={searchQuery}
           onChange={handleSearch}
           className="w-full md:w-96" 
        />
      </div>
      <div className="flex items-center gap-4">
        <BellDot className="text-2xl"/>
        <Image
          src={Avatar}
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
