import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>📝 Task Manager</Link>
      <div>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.name}!</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#4f46e5',
    color: 'white',
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  welcome: {
    marginRight: '1rem',
    color: 'white',
  },
  btn: {
    padding: '0.4rem 1rem',
    backgroundColor: 'white',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '1rem',
    fontWeight: 'bold',
  },
};

export default Navbar;