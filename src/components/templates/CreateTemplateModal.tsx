import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import type { ChecklistTemplate, Item } from '../../types';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (template: Omit<ChecklistTemplate, 'id'>) => void;
}

export default function CreateTemplateModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'party' as ChecklistTemplate['type'],
    categories: [] as string[],
    items: [] as string[],
  });

  const [items] = useState<Item[]>([
    {
      id: '1',
      name: 'Professional Speaker',
      category: 'Audio',
      description: 'High-quality powered speaker',
      quantity: 4,
      available: 3,
    },
    {
      id: '2',
      name: 'LED Par Light',
      category: 'Lighting',
      description: 'RGB LED Par Can',
      quantity: 8,
      available: 8,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const toggleItem = (itemId: string, category: string) => {
    setFormData(prev => {
      const items = prev.items.includes(itemId)
        ? prev.items.filter(id => id !== itemId)
        : [...prev.items, itemId];

      const categories = [...new Set([...prev.categories, category])].filter(cat =>
        items.some(id => items.find(item => item.id === id)?.category === cat)
      );

      return { ...prev, items, categories };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                required
                className="input-primary"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                required
                className="input-primary"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ChecklistTemplate['type'] }))}
              >
                <option value="party">Party</option>
                <option value="concert">Concert</option>
                <option value="wedding">Wedding</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Items</h3>
            
            <div className="space-y-4">
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
                  type="button"
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
                    type="button"
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

            <div className="mt-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
              <div className="divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="p-4 flex items-center hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      checked={formData.items.includes(item.id)}
                      onChange={() => toggleItem(item.id, item.category)}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={formData.items.length === 0}
              className="btn-primary disabled:opacity-50"
            >
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}