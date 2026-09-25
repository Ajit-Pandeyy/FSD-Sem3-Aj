import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onToggleSignup }) {
  const [email, setEmail] = useState('avs@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      onLoginSuccess(data.user || { email, name: 'User' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authCard}>
      <h2 style={styles.title}>Welcome Back</h2>
      <p style={styles.subtitle}>Log in to access your Postman tester dashboard</p>

      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            required
            style={styles.input}
            placeholder="e.g. avs@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            required
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div style={styles.toggleText}>
        Don't have an account?{' '}
        <span style={styles.toggleLink} onClick={onToggleSignup}>
          Sign Up
        </span>
      </div>
    </div>
  );
}

const styles = {
  authCard: {
    width: '380px',
    backgroundColor: '#252526',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '22px',
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 20px 0',
    fontSize: '13px',
    color: '#aaa',
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #ef4444',
    color: '#f87171',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '13px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    color: '#ccc',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1e1e1e',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#097bed',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '12px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  toggleText: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#aaa',
    textAlign: 'center',
  },
  toggleLink: {
    color: '#097bed',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
