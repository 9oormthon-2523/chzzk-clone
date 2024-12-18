import Link from 'next/link'
import React from 'react'

interface HashTagLiProps {
    tagname:string
    path:string
}

function LiveHashTag({ tags }: { tags: HashTagLiProps[] }) {
    
  return (
    <ul id="관련태그" className="text-[#666] mt-[8px] overflow-hidden flex flex-wrap text-[11px] gap-[4px] leading-[19px]">
        {tags.map((tag, idx) => (
          <HashTagLi key={`${tag.tagname}-${idx}`} {...tag} />
        ))}
    </ul>
  )
}

export default LiveHashTag

function HashTagLi({ path, tagname } : HashTagLiProps){
    return (
        <li className="m-0 p-0">
            <Link href={path} className="inline-block align-top rounded-[5px] relative text-[inherit]">
                <span className="border-[#00000026] border-solid border-[1px] break-words p-[0_6px] rounded-[5px] inline-block align-top">
                    { tagname }
                </span>
            </Link>
        </li>
    )
}