
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              Ω
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              IP Moat Strategist
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Support</span>
          </nav>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} IP Moat Strategist. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};
