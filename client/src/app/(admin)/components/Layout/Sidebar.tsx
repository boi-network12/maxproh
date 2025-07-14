import { Home, Users, Settings } from "lucide-react";
import Link from "next/link";

const links = [
  { name: "Home", icon: <Home className="h-5 w-5" />, href: "/admin" },
  { name: "Users", icon: <Users className="h-5 w-5" />, href: "/admin/users" },
  { name: "Settings", icon: <Settings className="h-5 w-5" />, href: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-4 hidden md:block text-xl font-bold">Admin</div>
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700"
          >
            <span>{link.icon}</span>
            <span className="hidden md:inline">{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
