import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dateIcon, deleteIcon, editIcon, starIcon } from "../../assets/icons";
import {
  deleteTodo,
  fetchTodos,
  updateTodo,
  updateIsCompleted,
  updateIsImportant,
} from "../../features/todos/todosSlice";
import Button from "../atomic_components/Button";
import EditModal from "./EditModal";
import { toast, Toaster } from "react-hot-toast";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(todo.isCompleted);
  const [isImportant, setIsImportant] = useState(todo.isImportant);

  useEffect(() => {
    if (todo.isCompleted === true) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    if (todo.isImportant === true) {
      setIsImportant(true);
    } else {
      setIsImportant(false);
    }
  }, [todo.isCompleted]);

  const handleDelete = async () => {
    await dispatch(deleteTodo(todo));
    dispatch(fetchTodos());
  };

  const handleChange = async (e) => {
    setIsChecked(e.target.checked);
    await dispatch(
      updateIsCompleted({
        id: todo.id,
        isCompleted: e.target.checked,
      })
    );
    dispatch(fetchTodos());
  };

  const handleIsImportant = async (e) => {
    setIsImportant(e.target.checked);
    // console.log(e.target.checked);
    await dispatch(
      updateIsImportant({
        id: todo.id,
        isImportant: e.target.checked,
      })
    );
    dispatch(fetchTodos());
  };

  return (
    <div className="bg-gray-700 px-4 py-3 flex rounded">
      <div className="todo flex items-center gap-4 flex-1 text-gray-300">
        <input
          id="isCompleted"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            handleChange(e);
          }}
          className="h-5 w-5 rounded accent-emerald-500"
        />
        <div className="todo-and-duedate">
          <p
            className={`${todo.isCompleted ? "line-through text-emerald-400" : ""
              }`}
          >
            {todo.todo}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="">{dateIcon("w-4 h-4")}</span>
            {todo.dueDate}
          </p>
        </div>
      </div>
      <div className="btn flex">
        <label
          htmlFor={`${todo.id}`}
          className="flex items-center p-3 hover:bg-gray-600 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={`${isImportant ? "#FACC15" : "none"}`}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </label>
        <input
          id={`${todo.id}`}
          type="checkbox"
          checked={isImportant}
          onChange={(e) => {
            handleIsImportant(e);
          }}
          className="hidden"
        />
        <Button icon={deleteIcon} onClick={() => handleDelete()} />
        <Button icon={editIcon} onClick={() => setIsModalOpen(true)} />
      </div>
      <EditModal
        todo={todo}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TodoCard;
