'use client';
import { useRouter } from 'next/navigation';

const BoardInput = () => {
  const router = useRouter(); 
  const useHandleClick = () => {
    router.push('/channel/write');
  }
  return (
    <div className="flex h-16 mt-4 w-full bg-gray-200 hover:bg-gray-300 rounded-2xl items-center font-semibold text-gray-500 pl-4 cursor-pointer"
    onClick={useHandleClick}>
      <div className="flex flex-col flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md text-sm mr-2"/>
    어떤 이야기를 남길건가요?</div>
  )
}

export default BoardInput