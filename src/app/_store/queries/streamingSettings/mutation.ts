import { StreamingMutateType } from '@/app/_types/streaming.type';
import { createClient } from '@/app/_utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      const fileName = `${Date.now()}_${props.thumbnail.name}`;
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

export const useStreamingOnOff = () => {
  const queryClient = useQueryClient();

  const { mutate: streamingInfoMutate } = useMutation({
    mutationKey: ['user-streaming'],
    mutationFn: (props: StreamingMutateType) => {
      return streamingUpdate(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaming'] });
    },
  });

  return { streamingInfoMutate };
};
