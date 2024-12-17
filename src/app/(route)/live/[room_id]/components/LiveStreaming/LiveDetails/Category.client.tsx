import React from 'react'

function LiveCategory({ category }: { category: string }) {
  return (
    <p id="카테고리" className="flex m-0 p-0">
        <span className="text-[#1bb373] flex flex-wrap text-[13px] gap-[2px_7px] tracking-[-0.3px] leading-[18px] min-w-0">          
            <a>{category}</a>
        </span>
    </p>
  )
}

export default LiveCategory