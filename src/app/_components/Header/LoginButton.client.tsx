"use client";
import useLoginModalToggle from "@/app/_store/modal/useLoginModalToggle.cliet";
import React from "react";

const LoginButton = () => {
  const toggle = useLoginModalToggle().toggle;
  const onClickHandler = () => toggle();
  return (
    <button
      onClick={onClickHandler}
      className="text-white  border border-white px-[10px] py-[5px] text-xs hover:bg-neutral-700 rounded-[8px]"
      // style={{ borderRadius: "8px" }}
    >
      로그인
    </button>
  );
};

export default LoginButton;
