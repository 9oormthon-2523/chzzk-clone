export interface Category {
  id: number;
  name: string;
  slug: string;
  backgroundImage: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Talk',
    slug: 'talk',
    backgroundImage: '/images/categories/talk.jpg',
  },
  {
    id: 2,
    name: '마인크래프트',
    slug: 'minecraft',
    backgroundImage: '/images/categories/minecraft.jpg',
  },
  {
    id: 3,
    name: '음악/노래',
    slug: 'music',
    backgroundImage: '/images/categories/music.jpg',
  },
  {
    id: 4,
    name: '그림/아트',
    slug: 'art',
    backgroundImage: '/images/categories/art.jpg',
  },
  {
    id: 5,
    name: '오버워치2',
    slug: 'overwatch2',
    backgroundImage: '/images/categories/overwatch2.jpg',
  },
  {
    id: 6,
    name: '리그 오브 레전드',
    slug: 'league-of-legends',
    backgroundImage: '/images/categories/league-of-legends.jpg',
  },
];
