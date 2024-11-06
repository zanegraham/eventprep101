import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:local.db',
});

export const db = {
  async getItems() {
    const result = await client.execute('SELECT * FROM items');
    return result.rows;
  },

  async addItem(item: Omit<Item, 'id'>) {
    const result = await client.execute({
      sql: 'INSERT INTO items (name, category, description, quantity, available, notes) VALUES (?, ?, ?, ?, ?, ?) RETURNING *',
      args: [item.name, item.category, item.description, item.quantity, item.available, item.notes || null]
    });
    return result.rows[0];
  },

  async updateItem(id: string, updates: Partial<Item>) {
    const sets = Object.entries(updates)
      .map(([key]) => `${key} = ?`)
      .join(', ');
    const values = Object.values(updates);

    const result = await client.execute({
      sql: `UPDATE items SET ${sets} WHERE id = ? RETURNING *`,
      args: [...values, id]
    });
    return result.rows[0];
  },

  async getEvents() {
    const result = await client.execute('SELECT * FROM events');
    return result.rows;
  },

  async addEvent(event: Omit<Event, 'id'>) {
    const result = await client.execute({
      sql: 'INSERT INTO events (name, date, type) VALUES (?, ?, ?) RETURNING *',
      args: [event.name, event.date.toISOString(), event.type]
    });
    const eventId = result.rows[0].id;

    // Add checklist items
    for (const item of event.checklist) {
      await client.execute({
        sql: 'INSERT INTO event_checklist (event_id, item_id, completed) VALUES (?, ?, ?)',
        args: [eventId, item.itemId, item.completed]
      });
    }

    return this.getEvent(eventId);
  },

  async getEvent(id: string) {
    const event = await client.execute({
      sql: 'SELECT * FROM events WHERE id = ?',
      args: [id]
    });

    if (!event.rows[0]) return null;

    const checklist = await client.execute({
      sql: 'SELECT * FROM event_checklist WHERE event_id = ?',
      args: [id]
    });

    return {
      ...event.rows[0],
      date: new Date(event.rows[0].date),
      checklist: checklist.rows
    };
  },

  async updateEventChecklist(eventId: string, itemId: string, completed: boolean) {
    await client.execute({
      sql: 'UPDATE event_checklist SET completed = ? WHERE event_id = ? AND item_id = ?',
      args: [completed, eventId, itemId]
    });
  },

  async getTemplates() {
    const result = await client.execute('SELECT * FROM templates');
    return result.rows;
  },

  async addTemplate(template: Omit<ChecklistTemplate, 'id'>) {
    const result = await client.execute({
      sql: 'INSERT INTO templates (name, type) VALUES (?, ?) RETURNING *',
      args: [template.name, template.type]
    });
    const templateId = result.rows[0].id;

    // Add template items
    for (const itemId of template.items) {
      await client.execute({
        sql: 'INSERT INTO template_items (template_id, item_id) VALUES (?, ?)',
        args: [templateId, itemId]
      });
    }

    return this.getTemplate(templateId);
  },

  async getTemplate(id: string) {
    const template = await client.execute({
      sql: 'SELECT * FROM templates WHERE id = ?',
      args: [id]
    });

    if (!template.rows[0]) return null;

    const items = await client.execute({
      sql: 'SELECT item_id FROM template_items WHERE template_id = ?',
      args: [id]
    });

    return {
      ...template.rows[0],
      items: items.rows.map(row => row.item_id)
    };
  }
};

export type { Item, Event, ChecklistTemplate } from '../types';