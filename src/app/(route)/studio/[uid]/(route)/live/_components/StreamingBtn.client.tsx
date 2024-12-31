"use clinet"

import dynamic from 'next/dynamic';
const StreamingCoreBtn = dynamic(() => import('./StreamingCoreBtn.client'), { ssr: false });

const StreamingBtn = () => {
    return <>
      <StreamingCoreBtn/>
    </>
}
export default StreamingBtn