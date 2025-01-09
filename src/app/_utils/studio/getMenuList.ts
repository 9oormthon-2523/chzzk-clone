interface MenuType {
  text: string;
  route: string;
  isImplement: boolean;
}

export const getMenuList = (uid: string): Record<string, MenuType[]> => ({
  대시보드: [{ text: '대시보드', route: `/studio/${uid}`, isImplement: true }],
  '방송 관리': [
    { text: '방송하기', route: `/studio/${uid}/live`, isImplement: true },
    { text: '설정', route: `/studio/${uid}/settings`, isImplement: false },
    { text: '알림', route: `/studio/${uid}/notice`, isImplement: false },
    {
      text: '리허설 방송 하기',
      route: `/studio/${uid}/rehearsal`,
      isImplement: false,
    },
  ],
  '시청자 관리': [
    { text: '팔로워', route: `/studio/${uid}/follower`, isImplement: true },
    {
      text: '구독자',
      route: `/studio/${uid}/subscriber`,
      isImplement: false,
    },
    {
      text: '활동 제한',
      route: `/studio/${uid}/blocklist`,
      isImplement: false,
    },
  ],
});
