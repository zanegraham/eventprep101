import { create } from 'zustand';
import { db, type Item, type Event, type ChecklistTemplate } from '../lib/db';

interface Store {
  items: Item[];
  events: Event[];
  templates: ChecklistTemplate[];
  loading: boolean;
  error: string | null;
  
  // Items
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
  updateItem: (id: string, updates: Partial<Item>) => Promise<void>;
  
  // Events
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEventChecklist: (eventId: string, itemId: string, completed: boolean) => Promise<void>;
  
  // Templates
  fetchTemplates: () => Promise<void>;
  addTemplate: (template: Omit<ChecklistTemplate, 'id'>) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  items: [],
  events: [],
  templates: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    try {
      set({ loading: true });
      const items = await db.getItems();
      set({ items, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addItem: async (item) => {
    try {
      set({ loading: true });
      const newItem = await db.addItem(item);
      set(state => ({ items: [...state.items, newItem], loading: false }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateItem: async (id, updates) => {
    try {
      set({ loading: true });
      const updatedItem = await db.updateItem(id, updates);
      set(state => ({
        items: state.items.map(item => item.id === id ? updatedItem : item),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchEvents: async () => {
    try {
      set({ loading: true });
      const events = await db.getEvents();
      set({ events, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addEvent: async (event) => {
    try {
      set({ loading: true });
      const newEvent = await db.addEvent(event);
      set(state => ({ events: [...state.events, newEvent], loading: false }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateEventChecklist: async (eventId, itemId, completed) => {
    try {
      set({ loading: true });
      await db.updateEventChecklist(eventId, itemId, completed);
      set(state => ({
        events: state.events.map(event => {
          if (event.id !== eventId) return event;
          return {
            ...event,
            checklist: event.checklist.map(item =>
              item.itemId === itemId ? { ...item, completed } : item
            )
          };
        }),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchTemplates: async () => {
    try {
      set({ loading: true });
      const templates = await db.getTemplates();
      set({ templates, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addTemplate: async (template) => {
    try {
      set({ loading: true });
      const newTemplate = await db.addTemplate(template);
      set(state => ({ templates: [...state.templates, newTemplate], loading: false }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));