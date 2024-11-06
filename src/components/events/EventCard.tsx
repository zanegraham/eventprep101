import React from 'react';
import { Calendar, Clock, CheckSquare } from 'lucide-react';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const completedItems = event.checklist.filter(item => item.completed).length;
  const totalItems = event.checklist.length;
  const progress = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
            {event.type}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckSquare className="w-4 h-4 mr-2" />
            <span className="text-sm">{completedItems} of {totalItems} items complete</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <button
          onClick={onClick}
          className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}