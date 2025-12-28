
import React, { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import RaceTrack from './components/RaceTrack';
import AdminPanel from './components/AdminPanel';
import { Student } from './types';
import { mockStudents, calculateStudentStats, COURSE_CONTENT } from './services/mockData';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kurs_tracker_v2_data');
    if (saved) {
      setStudents(calculateStudentStats(JSON.parse(saved)));
    } else {
      setStudents(calculateStudentStats(mockStudents));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('kurs_tracker_v2_data', JSON.stringify(students));
    }
  }, [students]);

  const handleUpdateStudent = (updated: Student) => {
    setStudents(prev => {
      const newList = prev.map(s => s.id === updated.id ? updated : s);
      return calculateStudentStats(newList);
    });
    setSelectedStudent(updated);
  };

  const handleAddStudent = (name: string) => {
    const newStudent: Student = {
      id: Date.now(),
      fullName: name,
      paragraphs: new Array(COURSE_CONTENT.length).fill(false),
      lastUpdated: Date.now()
    };
    setStudents(prev => calculateStudentStats([...prev, newStudent]));
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Студентті тізімнен өшіруді растайсыз ба?')) {
      setStudents(prev => calculateStudentStats(prev.filter(s => s.id !== id)));
    }
  };

  const activeStudentInList = selectedStudent 
    ? students.find(s => s.id === selectedStudent.id) || selectedStudent
    : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
               <span className="font-black text-lg">St</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tight leading-tight uppercase">Stepik курс</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Оқу прогресі</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isAdmin ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {isAdmin ? 'Шығу' : 'Админ'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10 space-y-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <section className="space-y-4">
               <div className="flex justify-between items-baseline px-2">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Жарыс көшбасшылары 🏎️</h2>
                  <div className="h-1 flex-1 mx-4 bg-slate-100 rounded-full"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Тікелей эфир</span>
               </div>
               <RaceTrack students={students} />
            </section>

            {isAdmin && (
              <AdminPanel 
                students={students} 
                onAdd={handleAddStudent} 
                onDelete={handleDeleteStudent} 
              />
            )}

            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter px-2">Үлгерім кестесі</h2>
              <StudentTable 
                students={students} 
                onSelect={setSelectedStudent} 
              />
            </section>
          </>
        )}
      </main>

      <StudentModal 
        student={activeStudentInList} 
        totalStudents={students.length}
        onClose={() => setSelectedStudent(null)} 
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
};

export default App;
