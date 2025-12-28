
import { Student } from '../types';

export const COURSE_CONTENT = [
  "1.1 О курсе", "1.2 Как проходить курс", "1.3 Для преподавателей", "1.4 Достижения курса",
  "2.1 Введение. Знакомство с Python", "2.2 Команды print() и input()", "2.3 Параметры sep и end", "2.4 Арифметика. Часть 1", "2.5 Арифметика. Часть 2",
  "3. Итоговая работа: Часть 1", "3. Итоговая работа: Часть 2",
  "4.1 Выбор из двух", "4.2 Логические операции", "4.3 Вложенные условия",
  "5. Итоговая работа: Задачи",
  "6.1 Числовые типы: int, float", "6.2 Строковый тип данных", "6.3 Модуль math",
  "7.1 Цикл for", "7.2 Функция range", "7.3 Сценарии. Часть 1", "7.4 Сценарии. Часть 2", "7.5 Цикл while", "7.6 Обработка цифр", "7.7 break, continue", "7.8 Поиск ошибок", "7.9 Вложенные циклы 1", "7.10 Вложенные циклы 2",
  "8. Итоговая работа: Часть 1", "8. Итоговая работа: Часть 2",
  "9.1 Индексация", "9.2 Срезы", "9.3 Методы строк 1", "9.4 Методы строк 2", "9.5 Методы строк 3", "9.6 Форматирование", "9.7 Unicode", "9.8 Сравнение строк",
  "10. Итоговая работа: Часть 1", "10. Итоговая работа: Часть 2",
  "11.1 Введение в списки", "11.2 Основы списков", "11.3 Методы списков 1", "11.4 Вывод элементов", "11.5 split() и join()", "11.6 Методы списков 2", "11.7 Списочные выражения", "11.8 Сортировка списков"
];

export const mockStudents: Student[] = [
  {
    id: 1,
    fullName: "Айбек Жакыпов",
    paragraphs: new Array(COURSE_CONTENT.length).fill(false).map((_, i) => i < 15),
    lastUpdated: Date.now() - 100000
  },
  {
    id: 2,
    fullName: "Данияр Омаров",
    paragraphs: new Array(COURSE_CONTENT.length).fill(false).map((_, i) => i < 25),
    lastUpdated: Date.now() - 50000
  },
  {
    id: 4,
    fullName: "Нурислам Каримов",
    paragraphs: new Array(COURSE_CONTENT.length).fill(true),
    lastUpdated: Date.now() - 10000
  }
];

export const calculateStudentStats = (students: Student[]): Student[] => {
  const processed = students.map(student => ({
    ...student,
    completedCount: student.paragraphs.filter(p => p).length
  }));

  return processed
    .sort((a, b) => {
      if (b.completedCount !== a.completedCount) {
        return (b.completedCount || 0) - (a.completedCount || 0);
      }
      return b.lastUpdated - a.lastUpdated;
    })
    .map((student, index) => ({ ...student, rank: index + 1 }));
};
