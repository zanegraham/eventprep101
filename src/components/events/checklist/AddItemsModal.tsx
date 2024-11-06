import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import type { Item } from '../../../types';

interface AddItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (itemIds: string[]) => void;
  items: Item[];
  existingItemIds: string[];
}

export default function AddItemsModal({
  isOpen,
  onClose,
  onAdd,
  items,
  existingItemIds,
}: AddItemsModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const availableItems = items.filter(item => !existingItemIds.includes(item.id));
  const categories = [...new Set(availableItems.map(item => item.category))];

  const filteredItems = availableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(selectedIds);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Items to Checklist</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedCategory
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === selectedCategory
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg mb-4">
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="p-4 flex items-center hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(prev => [...prev, item.id]);
                    } else {
                      setSelectedIds(prev => prev.filter(id => id !== item.id));
                    }
                  }}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  Available: {item.available}/{item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedIds.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            Add Selected Items
          </button>
        </div>
      </div>
    </div>
  );
}