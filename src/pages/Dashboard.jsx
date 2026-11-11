import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, ListTodo } from "lucide-react";

function Dashboard({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.filter((task) => !task.completed).length;
  const total = tasks.length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <header className="top-header">
        <div>
          <p className="date-label">YOUR PERSONAL WORKSPACE</p>
          <h1>Good day!</h1>
          <p className="subtitle">Let's make today productive.</p>
        </div>

        <div className="profile-icon">✿</div>
      </header>

      <section className="welcome-card">
        <div>
          <p className="welcome-small">A LITTLE REMINDER</p>
          <h2>Small steps every day,</h2>
          <h2>lead to big things.</h2>
          <p>Take your time and enjoy the process.</p>
        </div>
        <div className="welcome-decoration">✿</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card bg-white">
          <div className="stat-icon">
            <ListTodo size={22} />
          </div>
          <p>Total Tasks</p>
          <h2>{total}</h2>
        </div>

        <div className="stat-card bg-yellow">
          <div className="stat-icon">
            <Clock size={22} />
          </div>
          <p>In Progress</p>
          <h2>{active}</h2>
        </div>

        <div className="stat-card bg-pink">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
      </section>

      <section className="progress-section">
        <div className="section-heading">
          <div>
            <h2>Your Progress</h2>
            <p>Look how far you've come!</p>
          </div>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </section>

      <section className="recent-section">
        <div className="section-heading">
          <div>
            <h2>Recent Tasks</h2>
            <p>Your latest activities.</p>
          </div>

          <Link to="/tasks" className="view-all">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">☕</div>
            <h3>No tasks yet</h3>
            <p>Start adding your tasks and organize your day.</p>
            <Link to="/tasks" className="primary-button link-button">
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="recent-list">
            {tasks
              .slice(-4)
              .reverse()
              .map((task) => (
                <div className="recent-item" key={task.id}>
                  <span
                    className={
                      task.completed ? "recent-dot done-dot" : "recent-dot"
                    }
                  ></span>
                  <div>
                    <h3 className={task.completed ? "text-completed" : ""}>
                      {task.title}
                    </h3>
                    <p>{task.category}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

Dashboard.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Dashboard;
