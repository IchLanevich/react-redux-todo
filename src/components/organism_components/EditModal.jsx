import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos, updateTodo } from "../../features/todos/todosSlice";
import { motion } from "framer-motion";

const modalOpen = ["flex"];
const modalClosed = ["hidden"];

const EditModal = ({ todo, isModalOpen, setIsModalOpen }) => {
  const [newTodo, setNewTodo] = useState(todo.todo);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await dispatch(
      updateTodo({
        id: todo.id,
        todo: newTodo,
      })
    );
    dispatch(fetchTodos());
  };

  return (
    <div
      className={`${
        isModalOpen ? modalOpen : modalClosed
      } absolute z-1 inset-0 justify-center items-center bg-gray-900/90`}
    >
      <div className="form-wrapper w-[400px] max-w-4xl">
        <div className="close-btn-wrapper flex justify-end">
          <button
            onClick={() => setIsModalOpen(() => setIsModalOpen(false))}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 p-3 rounded-t"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col p-6 text-gray-900  bg-gray-800 rounded-tl rounded-bl rounded-br"
        >
          <label
            htmlFor="name"
            className="text-left text-gray-300 text-lg font-semibold mb-1"
          >
            Name
          </label>
          <input
            type="text"
            className="text-gray-900 px-4 py-2 rounded text-base"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="bg-cyan-600 rounded mt-8 text-white px-4 py-2 text-base font-semibold tracking-wide">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
