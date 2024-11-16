export default function formatDuration(duration: number) {
  const minute = 60;
  const hour = 60 * minute;
  let dur = duration;

  const hours = Math.floor(dur / hour);
  dur = dur % hour;

  const minutes = Math.floor(dur / minute);
  dur = dur % minute;

  const seconds = dur;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  return `${paddedMinutes}:${paddedSeconds}`;
}
