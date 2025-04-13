import { Instructor } from "./user";

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  overview?: string;
  thumbnail?: string;
  coverImage?: string;
  type: string;
  difficulty?: string;
  durationHours?: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  instructor?: Instructor;
  _count?: CourseCount;
}

export interface CourseCount {
  enrollments: number;
  reviews: number;
  modules: number;
}

export interface CourseData {
  data: Course[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CourseWithModules extends Course {
  modules: Module[];
}
export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
  _count: {
    lessons: number;
    quizzes: number;
  };
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  order: number;
  type: string;
  duration?: number;
  url?: string;
  createdAt: string;
  updatedAt: string;
}
export interface Quiz {
  id: number;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}
export interface Question {
  id: number;
  question: string;
  type: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
}
