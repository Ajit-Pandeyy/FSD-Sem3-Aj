import { useState } from 'react';
// @ts-ignore
import Login from './components/login.jsx';
// @ts-ignore
import Signup from './components/signup.jsx';
// @ts-ignore
import Dashboard from './components/dashboard.jsx';
// @ts-ignore
import ApiTester from './components/apiTester.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activePage, setActivePage] = useState<'dashboard' | 'apitester'>('dashboard');

  const handleAuthSuccess = (loggedUser: any) => {
    setUser(loggedUser);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode('login');
  };

  if (!user) {
    return (
      <div style={styles.authContainer}>
        {authMode === 'login' ? (
          <Login
            onLoginSuccess={handleAuthSuccess}
            onToggleSignup={() => setAuthMode('signup')}
          />
        ) : (
          <Signup
            onSignupSuccess={handleAuthSuccess}
            onToggleLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div style={styles.appWrapper}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.brandLogo}>Express Postman Suite</span>
          <div style={styles.navLinks}>
            <button
              style={activePage === 'dashboard' ? styles.navLinkActive : styles.navLink}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </button>
            <button
              style={activePage === 'apitester' ? styles.navLinkActive : styles.navLink}
              onClick={() => setActivePage('apitester')}
            >
              ApiTester
            </button>
          </div>
        </div>

        <div style={styles.navRight}>
          <span style={styles.userInfo}>User: <strong style={{ color: '#097bed' }}>{user.name || user.email}</strong></span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Page Area */}
      <div style={styles.contentArea}>
        {activePage === 'dashboard' ? <Dashboard /> : <ApiTester />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
  },
  navbar: {
    height: '50px',
    backgroundColor: '#252526',
    borderBottom: '1px solid #333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  brandLogo: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#097bed',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#aaa',
    padding: '8px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
  },
  navLinkActive: {
    background: '#1e1e1e',
    border: 'none',
    color: '#097bed',
    padding: '8px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userInfo: {
    fontSize: '13px',
    color: '#ddd',
  },
  logoutBtn: {
    backgroundColor: '#333',
    color: '#ff4d4d',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    overflow: 'auto',
  },
};

export default App;
