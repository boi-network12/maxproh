"use client";
import DashboardCard from '@/components/DashboardCard/DashboardCard';
import Navbar from '@/components/Navbar/Navbar';
import SocialContainer from '@/components/SocialContainer/SocialContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { AuthUser } from '@/types/auth';
import { SocialProperty } from '@/types/social';
import React, { useState } from 'react';

interface HomeUIProps {
  user: AuthUser;
}

const HomeUI: React.FC<HomeUIProps> = ({ user }) => {
  const [platform, setPlatform] = useState<string>('tiktok'); // Default to the first platform
  const [socialTypes, setSocialTypes] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Enter TikTok URL'); // Default placeholder
  const [formData, setFormData] = useState<SocialProperty>({
    socialMediaPlatform: 'tiktok',
    unitPrice: 0,
    quantity: 0,
    totalPrice: 0,
    socialLink: '',
  });

  const handlePlatformSelect = (selectedPlatform: string, newPlaceholder: string) => {
    setPlatform(selectedPlatform);
    setPlaceholder(newPlaceholder);
    setFormData({
      ...formData,
      socialMediaPlatform: selectedPlatform,
      socialLink: '', // Reset social link when platform changes
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Updated Quantity Options
  const quantityOptions = [
    { label: '100 Likes - ₦5000', value: '100_likes' },
    { label: '200 Likes - ₦9000', value: '200_likes' },
    { label: '100 Followers - ₦7000', value: '100_followers' },
    { label: '200 Followers - ₦13000', value: '200_followers' },
    { label: '50 Emoji Comments - ₦6000', value: '50_emoji_comments' },
    { label: '20 Real Comments - ₦10000', value: '20_real_comments' },
    { label: '100 Reels Views - ₦4000', value: '100_reels_views' },
    { label: 'Boost Followers (Fast) - ₦15000', value: 'boost_followers' },
    { label: 'Custom Quantity', value: 'custom' },
  ];

  // Updated Social Types Options
  const socialTypesOption = [
    { label: 'Likes', value: 'likes' },
    { label: 'Followers', value: 'followers' },
    { label: 'Shares', value: 'shares' },
    { label: 'Reels Views', value: 'reels_views' },
    { label: 'Boost Followers', value: 'boost_followers' },
    { label: 'Emoji Comments', value: 'emoji_comments' },
    { label: 'Real Comments', value: 'real_comments' },
    { label: 'Custom Engagement', value: 'custom' },
  ];

  return (
    <div className="w-full">
      <Navbar user={user} />
      <section className="w-full flex items-center justify-center pt-3">
        <DashboardCard user={user} />
      </section>
      <section className="w-full flex items-center justify-center pt-3">
        <SocialContainer onPlatformSelect={handlePlatformSelect} selectedPlatform={platform} />
      </section>
      <section className="w-full flex items-center justify-center pt-3">
        <form onSubmit={handleSubmit} className="w-[90%] max-w-screen-xl">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="socialLink">{`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}</Label>
            <Input
              id="socialLink"
              placeholder={placeholder}
              type="text"
              value={formData.socialLink}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="select">Select social Types</Label>
            <Select
              options={socialTypesOption}
              value={socialTypes}
              onChange={(e) => setSocialTypes(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="select">Select social quantity</Label>
            <Select
              options={quantityOptions}
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            <p>Submit request</p>
            <BottomGradient />
          </button>
        </form>
      </section>
    </div>
  );
};

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
    <div className={cn('flex w-full flex-col space-y-1', className)}>
      {children}
    </div>
  );
};

export default HomeUI;