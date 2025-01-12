export const getColorFromNickname = (nickname: string): string => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }

  // HSL 값 계산
  let hue = hash % 360;

  if (hue >= 50 && hue <= 60) {
    hue = (hue + 70) % 360;
  }

  const saturation = 70;
  let lightness = 60;

  if (lightness < 30) {
    lightness = 40;
  }

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return color;
};
