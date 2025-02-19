import { openDB } from 'idb';

const dbName = 'quiz-platform';
const storeName = 'quiz-attempts';

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
}

export async function initDB() {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    },
  });
  return db;
}

export async function saveQuizAttempt(attempt: QuizAttempt) {
  const db = await initDB();
  await db.add(storeName, attempt);
}

export async function getQuizAttempts(): Promise<QuizAttempt[]> {
  const db = await initDB();
  return db.getAll(storeName);
}