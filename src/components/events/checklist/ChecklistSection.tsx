import React from 'react';
import { Check } from 'lucide-react';
import type { Item } from '../../../types';

interface ChecklistSectionProps {
  checklist: { itemId: string; completed: boolean; }[];
  items: Item[];
  onToggleItem: (itemId: string) => void;
}

export default function ChecklistSection({ checklist, items, onToggleItem }: ChecklistSectionProps) {
  const categories = [...new Set(items
    .filter(item => checklist.some(cl => cl.itemId === item.id))
    .map(item => item.category)
  )];

  return (
    <div className="divide-y divide-gray-200">
      {categories.map(category => {
        const categoryItems = items.filter(item => 
          item.category === category && 
          checklist.some(cl => cl.itemId === item.id)
        );

        return (
          <div key={category} className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{category}</h3>
            <div className="space-y-3">
              {categoryItems.map(item => {
                const checklistItem = checklist.find(cl => cl.itemId === item.id)!;
                
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg -mx-2"
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          checklistItem.completed
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {checklistItem.completed && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div>
                        <p className={`text-sm font-medium ${
                          checklistItem.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Available: {item.available}/{item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {checklist.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No items in checklist. Click "Add Items" to get started.
        </div>
      )}
    </div>
  );
}