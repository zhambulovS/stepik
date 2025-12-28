
import React from 'react';
import { Student } from '../types';
import { COURSE_CONTENT } from '../services/mockData';

interface RaceTrackProps {
  students: Student[];
}

const RaceTrack: React.FC<RaceTrackProps> = ({ students }) => {
  const totalSteps = COURSE_CONTENT.length;
  const sortedByProgress = [...students].sort((a, b) => (b.completedCount || 0) - (a.completedCount || 0));

  return (
    <div className="bg-slate-800 p-6 rounded-[2rem] shadow-2xl border-4 border-slate-700 overflow-hidden relative">
      <div className="flex justify-between mb-4 border-b border-slate-600 pb-2">
        <div className="flex flex-col">
           <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Бастау</span>
           <span className="text-slate-500 text-[8px] font-bold">1-тақырып</span>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-yellow-400 font-black text-[10px] uppercase tracking-widest">Мәре</span>
           <span className="text-yellow-600/50 text-[8px] font-bold">{totalSteps}-тақырып</span>
        </div>
      </div>
      
      <div className="space-y-4 relative">
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-[repeating-linear-gradient(to_bottom,#fff_0,#fff_10px,#000_10px,#000_20px)] opacity-30"></div>

        {sortedByProgress.slice(0, 10).map((student) => {
          const progress = (student.completedCount || 0) / totalSteps;
          return (
            <div key={student.id} className="relative h-8 group">
              <div className="absolute inset-y-3.5 left-0 right-0 h-0.5 bg-slate-700/50 rounded-full"></div>
              
              <div 
                className="absolute top-0 transition-all duration-1000 ease-in-out flex items-center"
                style={{ left: `calc(${progress * 100}% - 24px)` }}
              >
                <div className="relative">
                   <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[9px] px-2 py-0.5 rounded shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                     {student.fullName} ({student.completedCount})
                   </div>
                   <div className="text-xl filter drop-shadow-lg cursor-default transform group-hover:scale-125 transition-transform">
                     🏎️
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {students.length > 10 && (
        <p className="mt-4 text-center text-[9px] text-slate-500 font-bold uppercase tracking-widest">Үздік 10 қатысушы көрсетілген</p>
      )}
    </div>
  );
};

export default RaceTrack;
