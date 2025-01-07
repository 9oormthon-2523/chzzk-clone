import React, { ReactNode } from 'react';
import Header from '../_components/Header/Header.server';
import Navigation from '../_components/Navigation/Navigation.client';
import ContentWrapper from '../_components/common/ContentWrapper.client';
import { createClient } from '@/app/_utils/supabase/server';
import Popup from '../_components/Popup/Popup.server';
import Block from '../_components/Block/Block.server';
import { UIDProvider } from '@/app/_store/context/useUid';

const StudioLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  const match = await matchStatus(uid);

  if (match === 'noUser') return <Popup />;
  if (match === 'notMatch') return <Block uid={uid} />;

  return (
    <UIDProvider uid={uid}>
      <div className="fixed w-full h-full">
        <Header uid={uid} />
        <ContentWrapper>
          <Navigation />
          <section className="flex overflow-auto flex-1 flex-col bg-[#f1f3f5] h-full">
            {children}
          </section>
        </ContentWrapper>
      </div>
    </UIDProvider>
  );
};

export default StudioLayout;

const matchStatus = async (
  uid: string
): Promise<'noUser' | 'notMatch' | 'match'> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 'noUser';
  if (user.id !== uid) return 'notMatch';
  return 'match';
};
