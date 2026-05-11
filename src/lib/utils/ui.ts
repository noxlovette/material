// File Renders
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// File Renders
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toUpperCase() || '';
}

// Test and Learn Modes
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function formatPercentage(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

/* 
Used in Badge renders
*/
export function getBadgeConfig(
  dueDate?: string | null,
  nowInput: number | Date = Date.now()
): 'red' | 'yellow' | 'blue' {
  if (!dueDate) return 'blue';

  const now = nowInput instanceof Date ? nowInput : new Date(nowInput);
  const due = new Date(dueDate);

  const nowMs = now.getTime();
  const dueMs = due.getTime();

  if (Number.isNaN(nowMs) || Number.isNaN(dueMs)) return 'blue';

  const diffDays = Math.ceil((dueMs - nowMs) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'red';
  if (diffDays <= 3) return 'yellow';
  return 'blue';
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}
