import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import InventoryList from './components/InventoryList';
import EventList from './components/events/EventList';

function App() {
  const [currentView, setCurrentView] = useState('inventory');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="ml-64">
        {currentView === 'inventory' ? <InventoryList /> : <EventList />}
      </main>
    </div>
  );
}

export default App;