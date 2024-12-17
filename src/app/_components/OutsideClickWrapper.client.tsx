'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  action: () => void; // 바깥이 클릭되었을 때 실행할 로직
  children: React.ReactNode;
}

const OutsideClickWrapper = ({ action, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        action();
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [action]);

  return <div ref={modalRef}>{children}</div>;
};

export default OutsideClickWrapper;
