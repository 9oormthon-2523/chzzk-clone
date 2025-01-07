import Link from 'next/link'
import React from 'react'

interface LiveCategoryProps {
  category: string 
}

function LiveCategory(props: LiveCategoryProps) {
  const { category } = props;

  return (
    <p id="카테고리" className="flex m-0 p-0">
        <span className="text-[#1bb373] flex flex-wrap text-[13px] gap-[2px_7px] tracking-[-0.3px] leading-[18px] min-w-0">          
            <Link href={"/"}>{category}</Link>
        </span>
    </p>
  )
}

export default LiveCategory