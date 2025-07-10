// src/utils/formatRemainingTime.ts
import dayjs from 'dayjs';

export const formatRemainingTime = (nextReviewDate: Date): string => {
  const now = dayjs();
  const nextDate = dayjs(nextReviewDate);
  const diffInDays = nextDate.diff(now, 'day');
  const diffInHours = nextDate.diff(now, 'hour');

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} remaining`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} remaining`;
  } else {
    return 'Due now';
  }
};
