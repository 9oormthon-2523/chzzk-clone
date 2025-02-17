'use client';
import Header from '../../_components/Header/Header.server';
import NavBar from '../(main)/_components/NavBar/NavBar.client';
import { categories } from './_components/categoryList';
import { useRouter } from 'next/navigation';
const category = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <NavBar />
      <div className="text-[22px] py-[60px] pl-[60px] pr-[20px] max-w-[2060px]">
        <div className="px-4 pt-4 flex justify-between">
          <strong className="font-blackHanSans font-thin ">카테고리</strong>
        </div>
        <div className="grid grid-cols-6 gap-4 p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="cursor-pointer rounded-lg overflow-hidden relative group"
              onClick={() => router.push(`/category/${category.slug}`)}
            >
              <img
                src={category.backgroundImage}
                alt={category.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-bold">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default category;
