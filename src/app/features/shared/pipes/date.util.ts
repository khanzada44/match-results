export function formatMatchDate(dateStr: string): string {
  if (!dateStr) return 'Date TBD';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}