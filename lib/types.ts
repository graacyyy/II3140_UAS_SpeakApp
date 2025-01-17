export interface Question {
  id: number;
  text: string;
  type: "single-select" | "text-input" | "multiple-select";
  options?: string[];
  answer: string | string[];
  multipleCorrect?: boolean;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface QuizAttempt {
  id: number;
  user_id: string;
  category_id: number;
  score: number;
  total_questions: number;
  completed_at: string;
}

export interface QuizAttemptResponse {
  id: number;
  score: number;
  total_questions: number;
  completed_at: string;
  categories: {
    name: string;
  };
}
