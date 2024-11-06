import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MerchandiseItem } from '../../../types';

interface MerchandiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: MerchandiseItem) => void;
  item?: MerchandiseItem | null;
}

export default function MerchandiseModal({
  isOpen,
  onClose,
  onSubmit,
  item,
}: MerchandiseModalProps) {
  const [formData, setFormData] = useState<Omit<MerchandiseItem, 'id'>>({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    imageUrl: item?.imageUrl || '',
    variants: item?.variants || [],
    status: item?.status || 'draft',
    orderDetails: item?.orderDetails,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: item?.id || Date.now().toString(),
      ...formData,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit Merchandise' : 'Add Merchandise'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              required
              className="input-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input-primary"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="input-primary"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              className="input-primary"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="input-primary"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as MerchandiseItem['status'],
                }))
              }
            >
              <option value="draft">Draft</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {item ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}