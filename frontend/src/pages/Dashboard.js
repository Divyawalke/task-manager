import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description },
        config
      );
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { status: newStatus },
        config
      );
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        { title, description },
        config
      );
      setTasks(tasks.map((t) => (t._id === editingTask._id ? data : t)));
      setEditingTask(null);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Tasks</h2>

      {error && <p style={styles.error}>{error}</p>}

      {/* Add / Edit Task Form */}
      <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={styles.btn}>
            {editingTask ? '✏️ Update Task' : '+ Add Task'}
          </button>
          {editingTask && (
            <button
              style={{ ...styles.btn, backgroundColor: '#6b7280' }}
              onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Task List */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={styles.empty}>No tasks yet! Add your first task above 👆</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{
            ...styles.taskCard,
            opacity: task.status === 'Completed' ? 0.7 : 1,
          }}>
            <div style={styles.taskTop}>
              <h3 style={{
                ...styles.taskTitle,
                textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
              }}>
                {task.title}
              </h3>
              <span style={{
                ...styles.badge,
                backgroundColor: task.status === 'Completed' ? '#d1fae5' : '#fef3c7',
                color: task.status === 'Completed' ? '#065f46' : '#92400e',
              }}>
                {task.status}
              </span>
            </div>
            {task.description && (
              <p style={styles.taskDesc}>{task.description}</p>
            )}
            <div style={styles.taskActions}>
              <button
                style={{ ...styles.actionBtn, backgroundColor: '#4f46e5' }}
                onClick={() => handleToggleStatus(task)}
              >
                {task.status === 'Pending' ? '✅ Complete' : '↩️ Undo'}
              </button>
              <button
                style={{ ...styles.actionBtn, backgroundColor: '#f59e0b' }}
                onClick={() => handleEdit(task)}
              >
                ✏️ Edit
              </button>
              <button
                style={{ ...styles.actionBtn, backgroundColor: '#ef4444' }}
                onClick={() => handleDelete(task._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' },
  heading: { fontSize: '1.8rem', marginBottom: '1.5rem', color: '#4f46e5' },
  form: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  btn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: '1.25rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '1rem',
  },
  taskTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { fontSize: '1.1rem', fontWeight: 'bold' },
  taskDesc: { color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' },
  badge: { padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' },
  taskActions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  actionBtn: { padding: '0.4rem 0.9rem', color: 'white', border: 'none', borderRadius: '5px', fontSize: '0.85rem' },
  error: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '5px', marginBottom: '1rem' },
  empty: { textAlign: 'center', color: '#888', marginTop: '3rem', fontSize: '1.1rem' },
};

export default Dashboard;