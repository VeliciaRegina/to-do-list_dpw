import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

function TaskForm({ onAdd, onClose, editData }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setCategory(editData.category);
      setPriority(editData.priority);
      setDate(editData.date || "");
    }
  }, [editData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      category,
      priority,
      date,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="form-header">
          <div>
            <h2>{editData ? "Edit Task" : "Create New Task"}</h2>
            <p>Make today a little more productive </p>
          </div>

          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Task Name</label>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Personal</option>
            <option>College</option>
            <option>Work</option>
            <option>Other</option>
          </select>

          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Deadline</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editData ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

TaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  editData: PropTypes.object,
};

export default TaskForm;
