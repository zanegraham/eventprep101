import React, { useState } from 'react';
import { Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import type { MerchandiseItem } from '../../../types';
import MerchandiseModal from './MerchandiseModal';

interface MerchandiseSectionProps {
  merchandise: MerchandiseItem[];
  onUpdate: (merchandise: MerchandiseItem[]) => void;
}

export default function MerchandiseSection({ merchandise, onUpdate }: MerchandiseSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MerchandiseItem | null>(null);

  const handleAddItem = (item: MerchandiseItem) => {
    onUpdate([...merchandise, item]);
    setIsModalOpen(false);
  };

  const handleEditItem = (item: MerchandiseItem) => {
    onUpdate(merchandise.map(m => m.id === item.id ? item : m));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    onUpdate(merchandise.filter(m => m.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Event Merchandise</h2>
          <p className="text-sm text-gray-500">Manage your event merchandise and track orders</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://craybo.com/merch-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Merch Lab
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Merchandise
          </button>
        </div>
      </div>

      {merchandise.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No merchandise added yet</h3>
          <p className="text-gray-500 mb-4">Start by adding merchandise items for your event</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Merchandise
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchandise.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MerchandiseModal
        isOpen={isModalOpen || !!editingItem}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={editingItem ? handleEditItem : handleAddItem}
        item={editingItem}
      />
    </div>
  );
}