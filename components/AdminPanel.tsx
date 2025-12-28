
import React, { useState } from 'react';
import { Student } from '../types';

interface AdminPanelProps {
  students: Student[];
  onAdd: (name: string) => void;
  onDelete: (id: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ students, onAdd, onDelete }) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-2 bg-red-100 text-red-600 rounded-lg">⚙️</span>
        Топты басқару
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Жаңа студенттің аты-жөні..."
          className="flex-1 px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all font-medium"
        />
        <button 
          type="submit"
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          ҚОСУ
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Қатысушылар тізімі</p>
        {students.map(s => (
          <div key={s.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors group">
            <span className="font-bold text-slate-700">{s.fullName}</span>
            <button 
              onClick={() => onDelete(s.id)}
              className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-all"
              title="Өшіру"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
