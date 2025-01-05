'use client';

import React, { createContext, useContext } from 'react';

const UIDContext = createContext<string | null>(null);

export const UIDProvider = ({
  uid,
  children,
}: {
  uid: string;
  children: React.ReactNode;
}) => {
  return <UIDContext.Provider value={uid}>{children}</UIDContext.Provider>;
};

export const useUID = () => {
  const context = useContext(UIDContext);
  if (!context) {
    throw new Error(
      'useUID는 UIDProvider 로 감싼 컴포넌트에서 사용 가능합니다.'
    );
  }
  return context;
};
