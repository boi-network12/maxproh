'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Pricing } from '../types/pricing';
import { createPricingAPI, deletePricingAPI, getAllPricing, updatePricingAPI } from '../utils/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

interface PricingContextType {
  pricingList: Pricing[];
  fetchPricing: () => Promise<void>;
  createPricing: (data: { socialMediaPlatform: string; unitPrice: number; quantity: number }) => Promise<void>;
  updatePricing: (id: string, data: { socialMediaPlatform?: string; unitPrice?: number; quantity?: number }) => Promise<void>;
  deletePricing: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [pricingList, setPricingList] = useState<Pricing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, user } = useAuth();

  const fetchPricing = useCallback(async () => {
    if (!token  || !user) {
      setPricingList([]);
      setIsLoading(false)
      return;
    }
    try {
      setIsLoading(true);
      const pricing = await getAllPricing(token);
      setPricingList(pricing);
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
      setPricingList([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  const createPricing = useCallback(
    async (data: { socialMediaPlatform: string; unitPrice: number; quantity: number }) => {
      if (!token || !user) {
        throw new Error('User is not authenticated');
      }

      
      if (user.role !== 'admin') {
        throw new Error('Insufficient permissions to create pricing');
      }

      try {
        setIsLoading(true);
        const pricingData = {
          ...data,
          createdBy: user.id
        }
        const newPricing = await createPricingAPI(pricingData, token); 
        setPricingList((prev) => [...prev, newPricing]); 
        fetchPricing()
      } catch (error) {
        console.error('Failed to create pricing:', error);
        throw new Error('Failed to create pricing');
      } finally {
        setIsLoading(false);
      }
    },
    [token, user, fetchPricing]
  );

   const updatePricing = useCallback(
    async (id: string, data: { socialMediaPlatform?: string; unitPrice?: number; quantity?: number }) => {
      if (!token || !user) {
        throw new Error('User is not authenticated');
      }
      if (user.role !== 'admin') {
        throw new Error('Insufficient permissions to update pricing');
      }
      try {
        setIsLoading(true);
        const updatedPricing = await updatePricingAPI(id, data, token);
        setPricingList((prev) =>
          prev.map((item) => (item._id === id ? updatedPricing : item))
        );
        fetchPricing()
        toast.success("updated successful!")
      } catch (error) {
        console.error('Failed to update pricing:', error);
        throw new Error('Failed to update pricing');
      } finally {
        setIsLoading(false);
      }
    },
    [token, user, fetchPricing]
  );

  const deletePricing = useCallback(
    async (id: string) => {
      if (!token || !user) {
        throw new Error('User is not authenticated');
      }
      if (user.role !== 'admin') {
        throw new Error('Insufficient permissions to delete pricing');
      }
      try {
        setIsLoading(true);
        await deletePricingAPI(id, token);
        setPricingList((prev) => prev.filter((item) => item._id !== id));
        toast.info("Delete successful!")
        fetchPricing()
      } catch (error) {
        console.error('Failed to delete pricing:', error);
        throw new Error('Failed to delete pricing');
      } finally {
        setIsLoading(false);
      }
    },
    [token, user, fetchPricing]
  );
  
  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  return (
    <PricingContext.Provider value={{ pricingList, fetchPricing, createPricing, updatePricing, deletePricing, isLoading }}>
      {children}
    </PricingContext.Provider>
  );
};

