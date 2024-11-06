import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import type { Event, Item } from '../../types';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';
import EventDetails from './EventDetails';

export default function EventList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [items] = useState<Item[]>([
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

  const handleCreateEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, event]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setSelectedEvent(updatedEvent);
  };

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        onUpdateEvent={handleUpdateEvent}
        items={items}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
        {events.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Calendar className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
            <p className="text-gray-500 text-center mb-4">Create your first event to start planning</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary"
            >
              Create Event
            </button>
          </div>
        )}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}