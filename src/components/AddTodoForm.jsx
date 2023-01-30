import React, { useEffect } from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addTodo, fetchTodos, getAllTodos } from "../features/todos/todosSlice";

const AddTodoForm = () => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todo && dueDate) {
      await dispatch(
        addTodo({
          todo: todo,
          dueDate: dueDate.toLocaleDateString(),
          isCompleted: isCompleted,
        })
      );
      toast.success("Todo added");
      setTodo("");
      setDueDate("");
      setIsCompleted(false);
      dispatch(fetchTodos());
    } else {
      toast.error("Please fill the form");
    }
  };

  return (
    <div className="bg-gray-800 max-w-3xl p-8 rounded-md">
      <form
        onSubmit={(e) => {
          handleAddTodo(e);
        }}
        className="text-gray-300 flex flex-col"
      >
        <label htmlFor="todo" className="font-semibold text-lg">
          Todo
        </label>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="bg-gray-600 px-3 py-2 rounded"
        />
        <label className="font-semibold text-lg mt-4">Due Date</label>
        <ReactDatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="px-3 py-2 rounded bg-gray-600 text-gray-400"
        />
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="isCompleted" className="font-semibold text-lg">
            Completed
          </label>
          <input
            id="isCompleted"
            type="checkbox"
            className="h-5 w-5 rounded accent-emerald-500"
            checked={isCompleted}
            onChange={() => setIsCompleted((prev) => !prev)}
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800  py-2 rounded mt-8"
        >
          Add todo
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddTodoForm;
