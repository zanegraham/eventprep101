import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Event } from '../../types';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onUpdate: (updatedEvent: Event) => void;
}

export default function EditEventModal({
  isOpen,
  onClose,
  event,
  onUpdate,
}: EditEventModalProps) {
  const [formData, setFormData] = useState({
    name: event.name,
    date: new Date(event.date).toISOString().slice(0, 16),
    type: event.type,
    venue: event.venue || '',
    expectedAttendees: event.expectedAttendees || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...event,
      name: formData.name,
      date: new Date(formData.date),
      type: formData.type,
      venue: formData.venue,
      expectedAttendees: formData.expectedAttendees ? parseInt(formData.expectedAttendees) : undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
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
              Event Type
            </label>
            <select
              required
              className="input-primary"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="party">Party</option>
              <option value="concert">Concert</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date & Time
            </label>
            <input
              type="datetime-local"
              required
              className="input-primary"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              className="input-primary"
              value={formData.venue}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, venue: e.target.value }))
              }
              placeholder="Enter venue name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Attendees
            </label>
            <input
              type="number"
              min="0"
              className="input-primary"
              value={formData.expectedAttendees}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expectedAttendees: e.target.value,
                }))
              }
              placeholder="Enter expected number of attendees"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}