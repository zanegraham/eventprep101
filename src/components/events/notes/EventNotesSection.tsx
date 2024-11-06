import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface EventNotesSectionProps {
  notes: string;
  onUpdateNotes: (notes: string) => void;
  details: Record<string, any>;
  onUpdateDetails: (details: Record<string, any>) => void;
}

export default function EventNotesSection({
  notes,
  onUpdateNotes,
  details,
  onUpdateDetails,
}: EventNotesSectionProps) {
  const [localNotes, setLocalNotes] = useState(notes);
  const [localDetails, setLocalDetails] = useState(details);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdateNotes(localNotes);
    onUpdateDetails(localDetails);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Event Details</h3>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Edit Details
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Contact
            </label>
            <input
              type="text"
              className="input-primary"
              value={localDetails.venueContact || ''}
              onChange={(e) =>
                setLocalDetails((prev) => ({
                  ...prev,
                  venueContact: e.target.value,
                }))
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              className="input-primary"
              value={localDetails.contactPhone || ''}
              onChange={(e) =>
                setLocalDetails((prev) => ({
                  ...prev,
                  contactPhone: e.target.value,
                }))
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Load-in Time
            </label>
            <input
              type="time"
              className="input-primary"
              value={localDetails.loadInTime || ''}
              onChange={(e) =>
                setLocalDetails((prev) => ({
                  ...prev,
                  loadInTime: e.target.value,
                }))
              }
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sound Check
            </label>
            <input
              type="time"
              className="input-primary"
              value={localDetails.soundCheck || ''}
              onChange={(e) =>
                setLocalDetails((prev) => ({
                  ...prev,
                  soundCheck: e.target.value,
                }))
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
        <textarea
          className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          placeholder="Add any important notes about the event..."
          disabled={!isEditing}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
        <div className="space-y-4">
          {Object.entries(localDetails.timeline || {}).map(([time, description]) => (
            <div key={time} className="flex gap-4">
              <input
                type="time"
                className="input-primary w-32"
                value={time}
                onChange={(e) =>
                  setLocalDetails((prev) => ({
                    ...prev,
                    timeline: {
                      ...prev.timeline,
                      [e.target.value]: description,
                    },
                  }))
                }
                disabled={!isEditing}
              />
              <input
                type="text"
                className="input-primary flex-1"
                value={description}
                onChange={(e) =>
                  setLocalDetails((prev) => ({
                    ...prev,
                    timeline: {
                      ...prev.timeline,
                      [time]: e.target.value,
                    },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
          ))}
          {isEditing && (
            <button
              onClick={() =>
                setLocalDetails((prev) => ({
                  ...prev,
                  timeline: {
                    ...prev.timeline,
                    '': '',
                  },
                }))
              }
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              + Add Timeline Entry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}