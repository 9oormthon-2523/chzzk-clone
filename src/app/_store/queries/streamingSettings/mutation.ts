import { StreamingMutateType } from '@/app/_types/streaming.type';
import { createClient } from '@/app/_utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const streamingUpdate = async (props: StreamingMutateType) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  let imageUrl = null;

  // 이미지 처리 관련 로직
  // - thumbnail이 File일때 => 스토리지에 저장 => 스토리지에서 path를 가져와 imageUrl에 저장
  // - thumbnail이 string일때 => imageUrl에 바로 저장
  if (props.thumbnail) {
    if (props.thumbnail instanceof File) {
      const fileName = `${Date.now()}_${crypto.randomUUID()}`;
      const { data: storageData } = await supabase.storage
        .from('streaming')
        .upload(fileName, props.thumbnail);

      if (storageData) {
        const { data: publicUrlData } = supabase.storage
          .from('streaming')
          .getPublicUrl(storageData.path);
        if (publicUrlData?.publicUrl) {
          imageUrl = publicUrlData.publicUrl;
        }
      }
    } else if (typeof props.thumbnail === 'string') {
      imageUrl = props.thumbnail;
    }
  }

  const { error } = await supabase.from('streaming_rooms').upsert({
    uid: user.id,
    title: props.title,
    thumbnail: imageUrl,
    tags: props.tags || [],
    category: props.category || '',
  });

  if (!error) alert(`방송 정보가 업데이트 되었습니다.`);
};

export const useStreamingUpdate = (uid: string) => {
  const queryClient = useQueryClient();

  const { mutate: streamingInfoMutate } = useMutation({
    mutationKey: ['user-streaming', uid],
    mutationFn: (props: StreamingMutateType) => {
      return streamingUpdate(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaming', uid] });
    },
  });

  return { streamingInfoMutate };
};

const streamingOn = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  await supabase.from('streaming_rooms').upsert({
    uid: user.id,
    is_active: true,
    start_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  });
};

const streamingOff = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data } = await supabase
    .from('users')
    .select('nickname')
    .eq('id', user.id)
    .single();

  await supabase.from('streaming_rooms').upsert({
    uid: user.id,
    title: `${data?.nickname}의 라이브 방송`,
    thumbnail: null,
    tags: [],
    category: '',
    is_active: false,
    start_time: null,
    audience_cnt: 0,
  });
};

export const useStreamingOnOff = (uid: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: onMutation } = useMutation({
    mutationKey: ['user-streaming', uid],
    mutationFn: () => {
      return streamingOn();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaming', uid] });
    },
  });

  const { mutateAsync: offMutation } = useMutation({
    mutationKey: ['user-streaming', uid],
    mutationFn: () => {
      return streamingOff();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaming', uid] });
    },
  });

  return { onMutation, offMutation };
};
