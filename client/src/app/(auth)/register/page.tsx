"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils';
import { RegisterCredentials } from '@/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';

const Register = () => {
    const { register, isLoading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterCredentials>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
          await register(formData)
          router.replace('/')
        } catch (error) {
          console.error('Registration error: ', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }

  return (
    <div className="w-full min-h-screen bg-white flex items-start justify-center md:items-center">
        <div className='!p-6 mx-auto w-full max-w-md md:rounded-2xl md:border md:border-gray-100'>
            <h1 className="text-xl font-bold text-neutral-800">welcome to maxproh</h1>
            <p className="mt-2 max-w-sm text-sm text-neutral-600  !mb-3"><Link href="/login" className='underline font-bold text-[#3b82f6]'>Login</Link> to Maxproh if you already have an account</p>

            <form className='!my-8' onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:gap-3">
                <LabelInputContainer>
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                      id="firstName" 
                      placeholder="First Name" 
                      type="text" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                   />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                      id="lastName" 
                      placeholder="Last Name" 
                      type="text" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                   id="email" 
                   placeholder="example@fc.com" 
                   type="email" 
                   value={formData.email}
                    onChange={handleChange}
                    required
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input 
                   id="password" 
                   placeholder="••••••••" 
                   type="password"
                   value={formData.password}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]  ,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                {isLoading ? <p className='flex items-center justify-center space-x-2'>
                  <ClipLoader
                     color='#fff'
                     loading={isLoading}
                     size={20}
                     aria-label='Loading spinner'
                     data-testid="loader"
                  /> <span>Loading...</span>
                </p> : <p>Sign up &rarr;</p>}
                <BottomGradient />
              </button>
            </form>
        </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {children}
    </div>
  );
};

export default Register