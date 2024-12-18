
interface PostProps {
  nickname: string; 
  content: string; 
}

const Post: React.FC<PostProps> = ({nickname, content}) => {
  return (
    <div className="flex w-full h-48 p-4 bg-gray-50 rounded-lg ">
          <div className="flex flex-col flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md text-sm mr-2"/>
          <div className="flex flex-col flex-wrap">
            <p className="text-m font-black">{nickname}</p>
            <div className="text-m w-full h-32 overflow-hidden break-words mt-2">{content}</div>
          </div>
        </div>
  )
}

export default Post