import PropTypes from "prop-types";

function TaskFilter({ filter, setFilter }) {
  const filters = ["All", "Active", "Completed"];

  return (
    <div className="filter-container">
      {filters.map((item) => (
        <button
          key={item}
          className={
            filter === item ? "filter-button selected" : "filter-button"
          }
          onClick={() => setFilter(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
