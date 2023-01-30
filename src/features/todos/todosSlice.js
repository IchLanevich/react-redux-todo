import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const initialState = {
  todos: [],
  status: "idle", // idle | succeeded | failed | loading
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ id }) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
    } catch (err) {
      return err.message;
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ todo, dueDate, isCompleted }) => {
    try {
      await axios.post(`http://localhost:3000/todos`, {
        id: uuid(),
        todo: todo,
        dueDate: dueDate,
        isCompleted: isCompleted,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todo, id }) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        todo,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const updateIsCompleted = createAsyncThunk(
  "todos/updateIsCompleted",
  async ({ isCompleted, id }) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        isCompleted: isCompleted,
      });
    } catch (err) {
      return err.message;
    }
  }
);

export const updateIsImportant = createAsyncThunk(
  "todos/updateIsImportant",
  async ({ isImportant, id }) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${id}`, {
        isImportant: isImportant,
      });
    } catch (err) {
      return err.message;
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending),
      (state, action) => {
        state.status = "loading";
      };
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export const getAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;

export default todosSlice.reducer;
