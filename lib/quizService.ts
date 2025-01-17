// lib/quizService.ts
import { supabase } from "@/lib/supabase";
import type {
  Question,
  Category,
  QuizAttempt,
  QuizAttemptResponse,
} from "./types";

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const quizService = {
  async getQuestionsByCategory(categoryName: string): Promise<Question[]> {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("name", categoryName)
      .single();

    if (!category) return [];

    const { data: questions, error } = await supabase
      .from("questions")
      .select(
        `
        *,
        question_options(option_text),
        answers(answer_text)
      `
      )
      .eq("category_id", category.id);

    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }

    const shuffledQuestions = shuffleArray(questions).slice(0, 5);

    return shuffledQuestions.map((q) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      options: q.question_options.map(
        (opt: { option_text: string }) => opt.option_text
      ),
      answer:
        q.type === "multiple-select"
          ? q.answers.map((a: { answer_text: string }) => a.answer_text)
          : q.answers[0].answer_text,
      multipleCorrect: q.type === "multiple-select",
      category_id: q.category_id,
    }));
  },

  async saveQuizAttempt(attempt: {
    category: string;
    score: number;
    totalQuestions: number;
    // userAnswers: Record<number, string | string[]>;
  }) {
    const { category, score, totalQuestions } = attempt;
    const user = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Get category id
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id")
      .eq("name", category.toLowerCase())
      .single();

    // Save quiz attempt
    const { error: attemptError } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.data.user?.id,
        category_id: categoryData?.id,
        score,
        total_questions: totalQuestions,
      });

    if (attemptError) {
      throw attemptError;
    }

    // Save user answers
    // const userAnswersToInsert = Object.entries(userAnswers).map(
    //   ([questionId, answer]) => ({
    //     attempt_id: quizAttempt.id,
    //     question_id: Number.parseInt(questionId),
    //     user_answer: Array.isArray(answer) ? answer.join(",") : answer,
    //     is_correct: false, // You'll need to implement the logic to check if answer is correct
    //   })
    // );

    // await supabase.from("user_answers").insert(userAnswersToInsert);
  },

  async getQuizAttempts(): Promise<
    {
      id: number;
      score: number;
      total_questions: number;
      completed_at: string;
      category: string;
    }[]
  > {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      throw new Error("User not authenticated");
    }

    const { data: attempts, error } = (await supabase
      .from("quiz_attempts")
      .select(
        `
        id,
        score,
        total_questions,
        completed_at,
        categories (
          name
        )
      `
      )
      .eq("user_id", user.data.user.id)
      .order("completed_at", { ascending: false })) as {
      data: QuizAttemptResponse[] | null;
      error: Error;
    };

    if (error) {
      console.error("Error fetching attempts:", error);
      return [];
    }

    return (attempts || []).map((attempt) => ({
      id: attempt.id,
      score: attempt.score,
      total_questions: attempt.total_questions,
      completed_at: attempt.completed_at,
      category: attempt.categories.name,
    }));
  },
};
