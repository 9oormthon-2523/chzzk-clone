import { useEffect } from "react";
import { createClient } from "../_utils/supabase/client";
import { useChatStore } from "../_store/chat/chatStore";
import { Message } from "../_types/chat/Chat";
import { userInfo } from "os";

export const useChat = () => {
  const { messages, addMessage, setMessages } = useChatStore();

  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*")
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();

    const subscription = supabase
      .channel("public:chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat" },
        (payload) => {
          addMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [addMessage, setMessages, supabase]);

  const sendMessage = async (message: string) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.error("인증되지 않은 사용자입니다.");
      return;
    }

    const userId = userData.user.id;
    const userNickname = userData.user.user_metadata.full_name;
    console.log("userData:", userData.user.user_metadata.full_name);
    const { error: insertError } = await supabase
      .from("chat")
      .insert([{ user_id: userId, message, nickname: userNickname }]);

    if (insertError) {
      console.error("메시지 삽입 중 오류 발생:", insertError.message);
    }
  };

  return { messages, sendMessage };
};
