import PropTypes from "prop-types";
import { Check, Trash2, Pencil } from "lucide-react";

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <Check size={16} strokeWidth={3} />}
      </button>

      <div className="task-info">
        <h3>{task.title}</h3>
        <p>
          {task.category} · {task.date || "No deadline"}
        </p>
      </div>

      <div className="task-actions">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <button onClick={() => onEdit(task)} title="Edit task">
          <Pencil size={18} />
        </button>

        <button onClick={() => onDelete(task.id)} title="Delete task">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string,
    priority: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskCard;
