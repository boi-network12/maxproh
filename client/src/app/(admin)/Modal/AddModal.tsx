'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { ClipLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Select } from '@/components/ui/Select';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { AuthUser } from '@/types/auth';

interface AddModalProps {
  token?: string | null;
  user: AuthUser | null
  onClose: () => void;
  isLoading: boolean
  createPricing: (
    data: {
      socialMediaPlatform: string;
      unitPrice: number;
      quantity: number;
    },
    token: string
  ) => Promise<void>;
}


const AddModal: React.FC<AddModalProps> = ({ onClose, token, isLoading, createPricing, user }) => {
    const [platform, setPlatform] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const socialMediaOptions = [
      { label: 'Facebook', value: 'facebook' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'Twitter', value: 'twitter' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'TikTok', value: 'tiktok' },
    ];

    const quantityOptions = [
      { label: '10', value: '10' },
      { label: '100', value: '100' },
      { label: '500', value: '500' },
      { label: '1000', value: '1000' },
      { label: '2000', value: '2000' },
      { label: '5000', value: '5000' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!platform || !unitPrice || !quantity) {
          toast.error('Please fill in all fields');
          return;
        }
        await createPricing(
          {
            socialMediaPlatform: platform,
            unitPrice: parseFloat(unitPrice),
            quantity: parseInt(quantity),
          },
          token!
        );
        toast.success('Pricing added successfully');
        onClose();
      } catch (error) {
        console.error('Failed to add pricing', error);
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
          aria-label='button'
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New social price</h2>
        <form onSubmit={handleSubmit} className="!my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="number">Price for one unit</Label>
            <Input
              id="unitPrice"
              placeholder="1000"
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="select">Select social media</Label>
            <Select
              options={socialMediaOptions}
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="quantity">Quantity</Label>
            <Select
              options={quantityOptions}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset],0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={!user}
          >
            {isLoading ? (
              <p className="flex items-center justify-center space-x-2">
                <ClipLoader
                  color="#fff"
                  loading={isLoading}
                  size={20}
                  aria-label="Loading spinner"
                  data-testid="loader"
                />
                <span>Loading...</span>
              </p>
            ) : (
              <p>Add</p>
            )}
            <BottomGradient />
          </button>
        </form>
      </div>
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
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {children}
    </div>
  );
};


export default AddModal;
