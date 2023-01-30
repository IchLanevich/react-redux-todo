import React from "react";

const TodoListSkeleton = () => {
  return (
    <div className="bg-gray-800 p-4 flex flex-col gap-2">
      <div className="bg-gray-700 animate-pulse w-full h-[64px] rounded px-4 py-3">
        <div className="bg-gray-600/50 w-full h-full"></div>
      </div>
      <div className="bg-gray-700 animate-pulse w-full h-[64px] rounded px-4 py-3">
        <div className="bg-gray-600/50 w-full h-full"></div>
      </div>
      <div className="bg-gray-700 animate-pulse w-full h-[64px] rounded px-4 py-3">
        <div className="bg-gray-600/50 w-full h-full"></div>
      </div>
    </div>
  );
};

export default TodoListSkeleton;
