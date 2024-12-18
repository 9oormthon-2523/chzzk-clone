"use clitne";
import React from "react";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
const NavBar = () => {
  const { isOpen, toggle } = useNavToggle();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#222]  text-white transform z-30 mt-[60px] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button
        onClick={toggle}
        className="text-white p-2 absolute top-2 right-2"
      >
        X
      </button>

      <nav className="p-4">
        <ul>
          <li className="mb-4 hover:text-gray-400 cursor-pointer">홈</li>
          <li className="mb-4 hover:text-gray-400 cursor-pointer">인기</li>
          <li className="mb-4 hover:text-gray-400 cursor-pointer">카테고리</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
