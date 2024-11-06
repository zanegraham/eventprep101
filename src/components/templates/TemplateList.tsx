import React, { useState } from 'react';
import { Plus, Template } from 'lucide-react';
import type { ChecklistTemplate } from '../../types';
import CreateTemplateModal from './CreateTemplateModal';
import TemplateCard from './TemplateCard';

export default function TemplateList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([
    {
      id: '1',
      name: 'Basic Party Setup',
      type: 'party',
      categories: ['Audio', 'Lighting'],
      items: ['1', '2'],
    },
  ]);

  const handleCreateTemplate = (template: Omit<ChecklistTemplate, 'id'>) => {
    const newTemplate: ChecklistTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Checklist Templates</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onDelete={handleDeleteTemplate}
          />
        ))}
        {templates.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Template className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No templates yet</h3>
            <p className="text-gray-500 text-center mb-4">Create your first template to streamline event planning</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary"
            >
              Create Template
            </button>
          </div>
        )}
      </div>

      <CreateTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTemplate}
      />
    </div>
  );
}