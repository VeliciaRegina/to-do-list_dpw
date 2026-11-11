import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskify-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskify-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        completed: false,
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function editTask(id, updatedTask) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    );
  }

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />

          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                editTask={editTask}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
