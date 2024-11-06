import React from 'react';
import { Menu, Package2, Calendar, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { icon: Package2, label: 'Inventory', id: 'inventory' },
    { icon: Calendar, label: 'Events', id: 'events' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <aside className="bg-white h-screen w-64 border-r border-gray-200 fixed left-0 top-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-xl">EventPrep</span>
        </div>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}