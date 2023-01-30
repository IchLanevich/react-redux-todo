import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  getAllTodos,
  getTodosStatus,
} from "../features/todos/todosSlice";
import { useEffect } from "react";
import TodoCard from "./organism_components/TodoCard";
import { motion } from "framer-motion";
import TodoListSkeleton from "./organism_components/TodoListSkeleton";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getAllTodos);
  const status = useSelector(getTodosStatus);

  const [sortBy, setSortBy] = useState("");

  console.log(todos)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const RenderTodoList = () => {
    if (!todos) {
      return <TodoListSkeleton />;
    }

    if (sortBy === "") {
      if (todos) {
        return todos.map((todo) => {
          return <TodoCard todo={todo} key={todo.id} />;
        })
      }
    }

    if (sortBy === "dueDate") {
      const orderedArr = [...todos].sort((a, b) => {
        a = a.dueDate.split("/");
        b = b.dueDate.split("/");
        // console.log(a);
        // console.log(b);
        // year | month | day
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });
      return orderedArr.map((todo) => {
        return <TodoCard todo={todo} key={todo.id} />;
      });
    }
  };

  return (
    <div className="bg-gray-800 p-4 flex flex-col gap-2">
      <div className="flex justify-end mb-2">
        <select
          className="px-3 py-2 rounded bg-gray-700 text-gray-300"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="dueDate">Due date</option>
        </select>
      </div>
      <RenderTodoList />
    </div>
  );
};

export default TodoList;
