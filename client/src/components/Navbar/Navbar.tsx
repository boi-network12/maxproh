"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Avatar from "@/assets/avatar-empty.png";
import { AuthUser } from "@/types/auth";

interface NavbarProps {
  user: AuthUser;
}

const dropdownItems = [
  { name: "Profile", href: "/profile" },
  { name: "Refers", href: "/referrals" },
  { name: "Transaction History", href: "/transactions" },
  { name: "Admin Dashboard", href: "/admin"}
];

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="MaxProh Logo" className="h-8 w-8" />
          <span className="text-2xl font-semibold">MaxProh</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <Image
                src={Avatar} // fallback image
                alt="User avatar"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
              <span className="sr-only">Open user menu</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
                <ul className="py-2">
                  {dropdownItems
                      .filter((item) => item.name !== "Admin Dashboard" || user?.role === "admin")
                      .map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
