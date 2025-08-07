// file path: src/types/lessonsType.ts

export interface LessonEntry {
  id?: number; // optional because DB generates it
  nickname: string;
  event_experienced: string;
  describe_lesson_learned: string;
  inspirational_message_for_others: string;
  post_created_date?: string; // ISO string,  auto generated
  year_event_happened?: number | null; // honeypot field, optional (null if not filled -- submission would be ignored)
}
