import { useEffect } from "react";
import { createClient } from "../_utils/supabase/client";
import { useChatStore } from "../_store/chat/chatStore";
import { Message } from "../_types/chat/Chat";

export const useChat = (roomId: string) => {
  const { messages, addMessage, setMessages } = useChatStore();

  const supabase = createClient();

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*")

        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();

    const subscription = supabase
      .channel("public:chat")
      .on(
        "postgres_changes",

        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          addMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [addMessage, setMessages, supabase, roomId]);

  const sendMessage = async (message: string) => {
    if (!roomId) {
      console.error("유효하지 않은 roomId입니다.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.error("인증되지 않은 사용자입니다.");
      return;
    }

    const userId = userData.user.id;
    const userNickname = userData.user.user_metadata.full_name;

    const { data: insertData, error: insertError } = await supabase
      .from("chat")
      .insert([
        { room_id: roomId, user_id: userId, message, nickname: userNickname },
      ])
      .select();

    if (insertError) {
      console.error("메시지 삽입 중 오류 발생:", insertError.message);
      return;
    }

    if (insertData && insertData.length > 0) {
      addMessage(insertData[0] as Message);
    }
  };

  return { messages, sendMessage };
};
