
import React, { useEffect, useState } from 'react';
import { Student } from '../types';
import { COURSE_CONTENT } from '../services/mockData';

interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
  onUpdate: (updatedStudent: Student) => void;
  totalStudents: number;
}

const StudentModal: React.FC<StudentModalProps> = ({ student, onClose, onUpdate, totalStudents }) => {
  const [localParagraphs, setLocalParagraphs] = useState<boolean[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const totalSteps = COURSE_CONTENT.length;

  useEffect(() => {
    if (student) {
      setLocalParagraphs([...student.paragraphs]);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [student]);

  if (!student) return null;

  const completed = localParagraphs.filter(p => p).length;
  const progressPercent = Math.round((completed / totalSteps) * 100);

  const toggleParagraph = (index: number) => {
    const next = [...localParagraphs];
    next[index] = !next[index];
    setLocalParagraphs(next);
    
    onUpdate({
      ...student,
      paragraphs: next,
      lastUpdated: Date.now()
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-500 h-[90vh] flex flex-col ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : '🐍'}
            </div>
            <div>
              <h2 className="text-2xl font-black mb-1">{student.fullName}</h2>
              <p className="text-indigo-100 font-medium opacity-80 uppercase tracking-widest text-[10px]">
                Рейтинг: {totalStudents} студенттің ішінде #{student.rank}-орын
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 shrink-0">
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Оқу прогресі</span>
            <span className="text-2xl font-black text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner border border-slate-100">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-slate-400 text-xs font-medium">{totalSteps} тапсырманың {completed}-ы орындалды</p>
        </div>

        {/* Paragraphs Grid - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COURSE_CONTENT.map((title, idx) => {
              const isDone = localParagraphs[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleParagraph(idx)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                    isDone 
                    ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 shadow-sm' 
                    : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    isDone ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-transparent group-hover:text-slate-300'
                  }`}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <span className={`text-sm font-bold leading-tight ${isDone ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-100 flex justify-center shrink-0">
          <button 
            onClick={onClose}
            className="px-12 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            САҚТАУ
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
