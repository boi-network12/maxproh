// src/app/(admin)/admin/setting/page.tsx
'use client';
import { CheckIcon, PenIcon, PlusIcon, XIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import AddModal from '../../Modal/AddModal';
import { useAuth } from '@/hooks/useAuth';
import { usePricing } from '@/hooks/usePricing';

const Setting = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, user } = useAuth();
  const { isLoading, createPricing, updatePricing, deletePricing, pricingList } = usePricing();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>('');

  const handleEdit = (index: number, currentPrice: number) => {
    setEditingIndex(index);
    setEditedPrice(currentPrice.toString());
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedPrice('');
  };

  const handleSave = async (index: number) => {
    if (!user || user.role !== 'admin') {
      alert('Only admins can update pricing');
      return;
    }
    if (index < 0 || index >= pricingList.length) {
      alert('Invalid pricing item index');
      console.error('Invalid index:', index);
      return;
    }
    const pricingItem = pricingList[index];
    if (!pricingItem?._id) {
      alert('Pricing item ID is missing');
      console.error('Missing ID for pricing item:', pricingItem);
      return;
    }
    try {
      const unitPrice = parseFloat(editedPrice);
      if (isNaN(unitPrice) || unitPrice < 0) {
        alert('Please enter a valid positive number for the price');
        return;
      }
      await updatePricing(pricingItem._id, { unitPrice });
      setEditingIndex(null);
      setEditedPrice('');
    } catch (error) {
      console.error('Failed to update pricing:', error);
      alert('Failed to update pricing: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || user.role !== 'admin') {
      alert('Only admins can delete pricing');
      return;
    }
    if (!id) {
      alert('Pricing item ID is missing');
      console.error('Missing ID for deletion');
      return;
    }
    if (confirm('Are you sure you want to delete this pricing?')) {
      try {
        await deletePricing(id);
      } catch (error) {
        console.error('Failed to delete pricing:', error);
        alert('Failed to delete pricing: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Top Navbar */}
      <nav className="w-full flex items-center justify-between p-4 rounded-xl bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
          disabled={!user}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add New</span>
        </button>
      </nav>

      {/* Main content */}
      <main className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-medium text-gray-700 mb-4">General Settings</h2>
        <div className="space-y-4">
          {pricingList.map((item, index) => (
            <div
              key={item._id || index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border transition"
            >
              <div className="text-gray-800 font-medium capitalize">
                {item?.socialMediaPlatform || 'Unknown Platform'}
              </div>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                {editingIndex === index ? (
                  <>
                    <input
                      placeholder="number"
                      type="number"
                      className="border border-gray-300 rounded-lg px-3 py-1 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <button
                      onClick={() => handleSave(index)}
                      aria-label="Save"
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      aria-label="Cancel"
                      className="text-red-500 hover:text-red-700"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-lg">
                      ₦{item?.unitPrice}
                    </span>
                    <button
                      onClick={() => handleEdit(index, item?.unitPrice)}
                      aria-label="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PenIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      aria-label="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <AddModal
          onClose={() => setShowModal(false)}
          token={token}
          isLoading={isLoading}
          createPricing={createPricing}
          user={user}
        />
      )}
    </div>
  );
};

export default Setting;