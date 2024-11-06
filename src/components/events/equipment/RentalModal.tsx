import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { EquipmentRental } from '../../../types';

interface RentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rental: EquipmentRental) => void;
  rental?: EquipmentRental | null;
}

export default function RentalModal({
  isOpen,
  onClose,
  onSubmit,
  rental,
}: RentalModalProps) {
  const [formData, setFormData] = useState<Omit<EquipmentRental, 'id'>>({
    name: rental?.name || '',
    description: rental?.description || '',
    quantity: rental?.quantity || 1,
    pickupDate: rental?.pickupDate || new Date(),
    returnDate: rental?.returnDate || new Date(),
    delivery: rental?.delivery || false,
    deliveryAddress: rental?.deliveryAddress || '',
    supplier: rental?.supplier || {
      name: '',
      contact: '',
      phone: '',
    },
    status: rental?.status || 'pending',
    cost: rental?.cost || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: rental?.id || Date.now().toString(),
      ...formData,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {rental ? 'Edit Rental' : 'Add Rental'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment Name
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
              Quantity
            </label>
            <input
              type="number"
              required
              min="1"
              className="input-primary"
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                required
                className="input-primary"
                value={new Date(formData.pickupDate).toISOString().split('T')[0]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pickupDate: new Date(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Date
              </label>
              <input
                type="date"
                required
                className="input-primary"
                value={new Date(formData.returnDate).toISOString().split('T')[0]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, returnDate: new Date(e.target.value) }))
                }
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.delivery}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, delivery: e.target.checked }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Delivery Required
              </span>
            </label>
          </div>

          {formData.delivery && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                required
                className="input-primary"
                value={formData.deliveryAddress}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))
                }
              />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Supplier Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <input
                type="text"
                required
                className="input-primary"
                value={formData.supplier.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    supplier: { ...prev.supplier, name: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                required
                className="input-primary"
                value={formData.supplier.contact}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    supplier: { ...prev.supplier, contact: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="input-primary"
                value={formData.supplier.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    supplier: { ...prev.supplier, phone: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="input-primary"
              value={formData.cost}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cost: parseFloat(e.target.value) }))
              }
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {rental ? 'Save Changes' : 'Add Rental'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}