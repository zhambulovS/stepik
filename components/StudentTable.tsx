
import React from 'react';
import { Student } from '../types';
import { COURSE_CONTENT } from '../services/mockData';

interface StudentTableProps {
  students: Student[];
  onSelect: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onSelect }) => {
  const totalSteps = COURSE_CONTENT.length;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Орын</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Студент</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Прогресс</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Әрекет</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
              <td className="px-6 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                  student.rank === 1 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200' :
                  student.rank === 2 ? 'bg-slate-300 text-white' :
                  student.rank === 3 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {student.rank === 1 ? '🏆' : student.rank}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-slate-800 font-bold group-hover:text-indigo-600 transition-colors">
                  {student.fullName}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-[120px] bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-500"
                      style={{ width: `${((student.completedCount || 0) / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {student.completedCount} <span className="text-slate-300">/ {totalSteps}</span>
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onSelect(student)}
                  className="px-4 py-2 bg-white border-2 border-slate-100 hover:border-indigo-500 hover:text-indigo-600 text-slate-600 text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Жаңарту
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
