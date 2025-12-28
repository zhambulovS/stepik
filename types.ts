
export interface Student {
  id: number;
  fullName: string;
  paragraphs: boolean[]; 
  lastUpdated: number;   
  rank?: number;
  completedCount?: number;
  color?: string; // Цвет машинки на трассе
}

export interface Grade {
  subject: string;
  score: number;
}
