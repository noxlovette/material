type TutorialKeyParams = {
  pathname: string;
  params: { id?: string };
};

export const resolveTutorialRole = (role: string | undefined) => {
  if (role === "t") return "teacher";
  if (role === "s") return "student";
  return "all";
};

export const resolveTutorialKey = ({ pathname, params }: TutorialKeyParams) => {
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[1];
  const { id } = params;

  if (!section) return null;

  const isEdit = segments.includes("edit");
  const isNew = segments.includes("new");

  switch (section) {
    case "dashboard":
      return "dashboard";

    case "lessons":
      if (isEdit) return "lesson-edit";
      if (id) return "lesson-detail";
      return "lessons";

    case "tasks":
      if (isEdit) return "task-edit";
      if (id) return "task-detail";
      return "tasks";

    case "flashcards":
      if (isEdit) return "flashcard-edit";
      if (id) return "flashcard-detail";
      return "flashcards";

    case "students":
      return segments.length >= 3 ? "student-detail" : "students";

    case "calendar":
      if (isNew) return "calendar-new";
      return segments.length >= 5 ? "calendar-day" : "calendar";

    default:
      return null;
  }
};
