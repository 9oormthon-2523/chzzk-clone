import React, { ReactNode } from 'react';
import Header from '../_components/Header/Header.server';
import Navigation from '../_components/Navigation/Navigation.client';
import ContentWrapper from '../_components/common/ContentWrapper.client';
import { createClient } from '@/app/_utils/supabase/server';
import { redirect } from 'next/navigation';
import Popup from '../_components/Popup/Popup.server';

const StudioLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  const match = await isMatchUid(uid);

  if (match) {
    return (
      <div className="fixed w-full h-full">
        <Header />
        <ContentWrapper>
          <Navigation />
          <section className="flex overflow-auto flex-1 flex-col bg-[#f1f3f5] h-full">
            {children}
          </section>
        </ContentWrapper>
      </div>
    );
  }

  return <Popup />;
};

export default StudioLayout;

const isMatchUid = async (uid: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;
  if (!uid) redirect(`/studio/${user.id}`);
  if (user.id !== uid) return false;

  return true;
};
