"use client";
import SpinnerLoading from '@/components/Loading/SpinnerLoading';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

interface UsersProps {
  searchQuery?: string;
}

const Users = ({ searchQuery }: UsersProps) => {
  const { fetchAllUsers, isLoading, users } = useUser();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user?.role !== "admin") {
      toast.error("Access denied: Admin only");
      router.push('/');
    }

    fetchAllUsers();
  }, [user, router, fetchAllUsers]);

  // Filter users based on searchQuery
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
    user.email.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
    user.role.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );



  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Balance</th>
              <th className="py-3 px-4 text-left">Active</th>
              <th className="py-3 px-4 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 capitalize text-gray-700">{user.role}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    ₦ {Intl.NumberFormat().format(user.accountBalance)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
