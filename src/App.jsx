import { useState } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import TodoListSkeleton from "./components/organism_components/TodoListSkeleton";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <Header />
      </div>
      <div className="container mx-auto max-w-3xl">
        <AddTodoForm />
      </div>
      <div className="container mx-auto max-w-3xl mt-8">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
