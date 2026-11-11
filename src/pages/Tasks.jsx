import { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Search } from "lucide-react";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";

function Tasks({ tasks, addTask, deleteTask, toggleTask, editTask }) {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  function openAddForm() {
    setEditData(null);
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditData(task);
    setShowForm(true);
  }

  function handleSave(data) {
    if (editData) {
      editTask(editData.id, data);
    } else {
      addTask(data);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchFilter =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);

    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div>
      <header className="top-header">
        <div>
          <p className="date-label">STAY ORGANIZED</p>
          <h1>
            My Tasks <span></span>
          </h1>
          <p className="subtitle">Keep track of everything you need to do.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} /> Add New Task
        </button>
      </header>

      <section className="task-toolbar">
        <TaskFilter filter={filter} setFilter={setFilter} />

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="task-list">
        <div className="section-heading">
          <div>
            <h2>All Activities</h2>
            <p>{filteredTasks.length} tasks found</p>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✿</div>
            <h3>No tasks found</h3>
            <p>Try adding a new task or changing your search.</p>
            {filter === "All" && search === "" && (
              <button className="primary-button" onClick={openAddForm}>
                <Plus size={17} /> Add your first task
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={openEditForm}
            />
          ))
        )}
      </section>

      {showForm && (
        <TaskForm
          onAdd={handleSave}
          onClose={() => setShowForm(false)}
          editData={editData}
        />
      )}
    </div>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default Tasks;
