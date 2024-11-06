import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:local.db',
});

async function setupDatabase() {
  // Create tables
  await client.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      quantity INTEGER NOT NULL,
      available INTEGER NOT NULL,
      notes TEXT,
      last_used TEXT
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS event_checklist (
      event_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (event_id, item_id),
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS template_items (
      template_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      PRIMARY KEY (template_id, item_id),
      FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE,
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    )
  `);

  // Add some initial data
  const items = [
    {
      id: '1',
      name: 'Professional Speaker',
      category: 'Audio',
      description: 'High-quality powered speaker',
      quantity: 4,
      available: 3,
      notes: 'Regular maintenance required'
    },
    {
      id: '2',
      name: 'LED Par Light',
      category: 'Lighting',
      description: 'RGB LED Par Can',
      quantity: 8,
      available: 8,
      notes: 'New stock'
    }
  ];

  for (const item of items) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO items (id, name, category, description, quantity, available, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [item.id, item.name, item.category, item.description, item.quantity, item.available, item.notes]
    });
  }

  console.log('Database setup complete!');
}

setupDatabase().catch(console.error);