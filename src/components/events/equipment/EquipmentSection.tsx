import React, { useState } from 'react';
import { Plus, ExternalLink, Package, Truck } from 'lucide-react';
import type { EquipmentRental } from '../../../types';
import RentalModal from './RentalModal';

interface EquipmentSectionProps {
  equipment: EquipmentRental[];
  onUpdate: (equipment: EquipmentRental[]) => void;
}

export default function EquipmentSection({ equipment, onUpdate }: EquipmentSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRental, setEditingRental] = useState<EquipmentRental | null>(null);

  const handleAddRental = (rental: EquipmentRental) => {
    onUpdate([...equipment, rental]);
    setIsModalOpen(false);
  };

  const handleEditRental = (rental: EquipmentRental) => {
    onUpdate(equipment.map(e => e.id === rental.id ? rental : e));
    setEditingRental(null);
  };

  const handleCancelRental = (id: string) => {
    onUpdate(equipment.filter(e => e.id !== id));
  };

  const getRentalStatus = (rental: EquipmentRental) => {
    const now = new Date();
    const pickupDate = new Date(rental.pickupDate);
    const returnDate = new Date(rental.returnDate);

    if (now < pickupDate) return 'upcoming';
    if (now > returnDate) return 'completed';
    return 'active';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Equipment Rentals</h2>
          <p className="text-sm text-gray-500">Manage your equipment rentals and reservations</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://craybo.com/equipment"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Browse Equipment
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Rental
          </button>
        </div>
      </div>

      {equipment.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment rentals yet</h3>
          <p className="text-gray-500 mb-4">Start by adding equipment rentals for your event</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Rental
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {equipment.map((rental) => {
            const status = getRentalStatus(rental);
            
            return (
              <div
                key={rental.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{rental.name}</h3>
                    <p className="text-sm text-gray-500">{rental.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Package className="w-4 h-4 mr-1" />
                        {rental.quantity} {rental.quantity === 1 ? 'unit' : 'units'}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Truck className="w-4 h-4 mr-1" />
                        {rental.delivery ? 'Delivery' : 'Pickup'}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    status === 'upcoming'
                      ? 'bg-blue-100 text-blue-800'
                      : status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Pickup/Delivery:</span>
                      <br />
                      {new Date(rental.pickupDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-gray-500">Return:</span>
                      <br />
                      {new Date(rental.returnDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingRental(rental)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancelRental(rental.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <RentalModal
        isOpen={isModalOpen || !!editingRental}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRental(null);
        }}
        onSubmit={editingRental ? handleEditRental : handleAddRental}
        rental={editingRental}
      />
    </div>
  );
}