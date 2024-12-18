import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LiveProfile({ imgURL } : { imgURL : string }) {
  const link = '/'

  return (
        <Link href={link} id="프로필 사진" className="relative rounded-full flex-none p-[0.2px] m-[1.8px_3px]  hover:[background:linear-gradient(45deg,#5bda30,#00000080)]">
            <Image alt="introduce-img" width={60} height={60} src={imgURL} className="bg-[#0000000f] rounded-[inherit] m-[3px] object-cover relative align-top border-0"/>
        </Link>
  )
}

export default LiveProfile