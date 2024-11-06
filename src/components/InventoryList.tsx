import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Item } from '../types';
import AddItemModal from './inventory/AddItemModal';
import InventoryFilters from './inventory/InventoryFilters';

export default function InventoryList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Professional Speaker',
      category: 'Audio',
      description: 'High-quality powered speaker',
      quantity: 4,
      available: 3,
      notes: 'Regular maintenance required',
    },
    {
      id: '2',
      name: 'LED Par Light',
      category: 'Lighting',
      description: 'RGB LED Par Can',
      quantity: 8,
      available: 8,
      notes: 'New stock',
    },
  ]);

  const handleAddItem = (newItem: Omit<Item, 'id'>) => {
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems(prev => [...prev, item]);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && item.available > 0) ||
      (availabilityFilter === 'low' && item.available < item.quantity * 0.2);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availabilityFilter={availabilityFilter}
        onAvailabilityChange={setAvailabilityFilter}
      />

      <div className="bg-white rounded-lg shadow mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.quantity}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.available === item.quantity 
                      ? 'bg-green-100 text-green-800'
                      : item.available === 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.available}/{item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}