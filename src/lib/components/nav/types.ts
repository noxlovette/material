export type NavPage =
  | "dashboard"
  | "flashcards"
  | "lessons"
  | "tasks"
  | "students"
  | "calendar"
  | "settings"
  | "legal"
  | "contact"
  | "why";

export interface BreadcrumbSegment {
  segment?: string;
  label: string;
  href: string;
}
