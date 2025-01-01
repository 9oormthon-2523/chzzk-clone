'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  action: () => void; // 바깥이 클릭되었을 때 실행할 로직
  children: React.ReactNode;
  ignoreIds?: string[];
}

const OutsideClickWrapper = ({ action, children, ignoreIds }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // 제외할 ID에 해당하는 요소인지 확인
      const isIgnored =
        ignoreIds && ignoreIds.some((id) => target.closest(`#${id}`));

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !isIgnored
      )
        action();
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [action, ignoreIds]);

  return <div ref={modalRef}>{children}</div>;
};

export default OutsideClickWrapper;
