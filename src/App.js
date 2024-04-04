import React, { useState } from 'react';
import 'C:/Users/Asus/Desktop/to-do/todo-app/to-do/src/index.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from Font Awesome
import logo from './logom.png';

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function App(props) {
  const [tasks, setTasks] = useState([
    { id: 0, text: "Task1", completed: true, date: new Date() },
    { id: 1, text: "Task2", completed: false, date: new Date() },
    { id: 2, text: "Task3", completed: false, date: new Date() },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (newTask.trim() === "") return;
  const newTaskObj = {
    id: tasks.length,
    text: newTask,
    completed: false,
    date: new Date() // Add current date and time
  };
  setTasks([...tasks, newTaskObj]);
  setNewTask("");
};

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed, date: new Date() } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleEdit = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
  };

  const handleEditChange = (event) => {
    setEditTaskText(event.target.value);
  };

  const handleEditSubmit = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleKeyDown = (event, taskId) => {
    if (event.key === 'Enter') {
      handleEditSubmit(taskId);
    }
  };

  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const taskStyle = {
    fontFamily: 'Stylish, serif', // Change font family
    color: '#f5f5f5', // Light gray text
    fontSize: '1.6rem' // Adjust font size as needed
  };

  return (
      <div className="todoapp stack-large">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1>MiniMates</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Ready to conquer the world? What's the plan, champion?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={newTask}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button
          type="button"
          className={`btn toggle-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          <span className="visually-hidden">Show </span>
          <span>ALL</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className={`btn toggle-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => handleFilterChange("active")}
        >
          <span className="visually-hidden">Show </span>
          <span>PENDING</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button
          type="button"
          className={`btn toggle-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterChange("completed")}
        >
          <span className="visually-hidden">Show </span>
          <span>COMPLETED</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      {filter === "all" && (
        <h2 id="list-heading">You've got {pendingTasks} pending tasks and {completedTasks} completed tasks</h2>
      )}
      {filter === "active" && (
        <h2 id="list-heading">Keep going! {pendingTasks} tasks pending only</h2>
      )}
      {filter === "completed" && (
        <h2 id="list-heading">{completedTasks} tasks completed</h2>
      )}
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredTasks.map(task => (
          <li key={task.id} className="todo stack-small">
          <div className="c-cb" style={taskStyle}>
            <input
              id={`todo-${task.id}`}
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <label
  className={`todo-label ${editTaskId === task.id ? "hidden" : ""}`}
  htmlFor={`todo-${task.id}`}
  onDoubleClick={() => handleEdit(task.id, task.text)}
>
  <span style={task.completed ? { textDecoration: 'line-through' } : {}}>
    {task.text}
  </span>
  {task.completed && <span className="todo-created-at"> - {formatDate(task.date)}</span>}
</label>
            {editTaskId === task.id && (
              <div className="edit-task">
                <input
                  type="text"
                  className="input input__lg"
                  value={editTaskText}
                  onChange={handleEditChange}
                  onKeyDown={(event) => handleKeyDown(event, task.id)}
                  autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn__primary"
                    onClick={() => handleEditSubmit(task.id)}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className="btn-group">
              <button type="button" className="btn" onClick={() => handleEdit(task.id, task.text)}>
                <FaEdit /> {/* Icon for Edit */}
                <span className="visually-hidden">Edit {task.text}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => deleteTask(task.id)}
              >
                <FaTrash /> {/* Icon for Delete */}
                <span className="visually-hidden">Delete {task.text}</span>
              </button>
            </div>
          </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default App;

