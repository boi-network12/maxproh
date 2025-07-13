"use client";
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Profile = () => {
  const { logout, user } = useAuth();
  const { updateProfile, isLoading } = useUser();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log('Updated Profile:', form);
        await updateProfile(form)
        toast.success("Update successfully!")
    } catch (error) {
        console.error("Error updating profile", error)
        toast.error('something went wrong!')
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 transition-all">
        <h1 className="text-3xl font-semibold text-zinc-800 mb-6">
          🛠️ Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="e.g. Kamdi"
              className="mt-2 w-full rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="e.g. Samuel"
              className="mt-2 w-full rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. kamdi@example.com"
              className="mt-2 w-full rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
            >
                {isLoading ? <p className='flex items-center justify-center space-x-2'>
                  <ClipLoader
                     color='#fff'
                     loading={isLoading}
                     size={20}
                     aria-label='Loading spinner'
                     data-testid="loader"
                  /> <span>Loading...</span>
                </p> : <p>💾 Save Changes</p>}
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
