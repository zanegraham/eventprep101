import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your account information and preferences',
      comingSoon: true,
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure event reminders and alerts',
      comingSoon: true,
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your data and security settings',
      comingSoon: true,
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Export or import your inventory and templates',
      comingSoon: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <section.icon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {section.title}
                </h2>
                <p className="text-gray-500 mb-4">{section.description}</p>
                {section.comingSoon ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Coming Soon
                  </span>
                ) : (
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Configure →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">About EventPrep</h3>
        <p className="text-sm text-gray-500">
          Version 1.0.0 • Made with ❤️ by StackBlitz
        </p>
      </div>
    </div>
  );
}