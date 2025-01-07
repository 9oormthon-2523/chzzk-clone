import moment from 'moment-timezone';

export const elapsedTime = (created_at: string) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerYear = msPerDay * 365;

  const userTimezone = moment.tz.guess(); // 유저가 현재 위치 파악
  const currentTimestamp = Date.parse(
    moment().tz(userTimezone).format() // 사용자의 현재 시간
  );
  const createTimeTimestamp = Date.parse(
    moment.utc(created_at).tz(userTimezone).format() // createTime의 UTC시간을 사용자의 현재시간 기준으로 바꾼 시간
  );
  const elapsed = currentTimestamp - createTimeTimestamp;

  if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + '초';

  if (elapsed < msPerHour) return Math.round(elapsed / msPerMinute) + '분';

  if (elapsed < msPerDay) return Math.round(elapsed / msPerHour) + '시간';

  if (elapsed < msPerYear) return Math.round(elapsed / msPerDay) + '일';

  return Math.round(elapsed / msPerYear) + '년';
};
