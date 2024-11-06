import React from 'react';
import { Trash2, FileCheck } from 'lucide-react';
import type { ChecklistTemplate } from '../../types';

interface TemplateCardProps {
  template: ChecklistTemplate;
  onDelete: (id: string) => void;
}

export default function TemplateCard({ template, onDelete }: TemplateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 mt-2 inline-block">
              {template.type}
            </span>
          </div>
          <button
            onClick={() => onDelete(template.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {template.categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <FileCheck className="w-4 h-4 mr-2" />
            <span className="text-sm">{template.items.length} items</span>
          </div>
        </div>
      </div>
    </div>
  );
}