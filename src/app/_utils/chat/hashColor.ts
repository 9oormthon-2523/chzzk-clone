export const getColorFromNickname = (nickname: string): string => {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`; // HSL 색상 생성 (밝고 다양하게)
  return color;
};
