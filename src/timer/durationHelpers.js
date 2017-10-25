export function getSecsFieldFromDuration(duration) {
  return duration % 60;
}

export function getMinsFieldFromDuration(duration) {
  return Math.floor((duration % (3600)) / 60);
}

export function getHoursFieldFromDuration(duration) {
  return Math.floor(duration / 3600);
}
