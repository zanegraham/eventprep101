import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Event, ChecklistTemplate } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Omit<Event, 'id'>) => void;
}

export default function CreateEventModal({ isOpen, onClose, onCreate }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'party',
    checklist: [],
  });

  const [templates] = useState<ChecklistTemplate[]>([
    {
      id: '1',
      name: 'Basic Party Setup',
      type: 'party',
      categories: ['Audio', 'Lighting'],
      items: ['1', '2'],
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const template = templates.find(t => t.id === selectedTemplate);
    const checklist = template
      ? template.items.map(itemId => ({ itemId, completed: false }))
      : [];

    onCreate({
      ...formData,
      date: new Date(formData.date),
      checklist,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              required
              className="input-primary"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select
              required
              className="input-primary"
              value={formData.type}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, type: e.target.value }));
                setSelectedTemplate('');
              }}
            >
              <option value="party">Party</option>
              <option value="concert">Concert</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input
              type="datetime-local"
              required
              className="input-primary"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template (Optional)</label>
            <select
              className="input-primary"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="">No template</option>
              {templates
                .filter(template => template.type === formData.type)
                .map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
            </select>
            {selectedTemplate && (
              <p className="mt-2 text-sm text-gray-500">
                This template includes {templates.find(t => t.id === selectedTemplate)?.items.length} items
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}