import React, { useState } from 'react';

export default function Signup({ onSignupSuccess, onToggleLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      onSignupSuccess(data.data || { name, email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authCard}>
      <h2 style={styles.title}>Create Account</h2>
      <p style={styles.subtitle}>Sign up to test backend users and endpoints</p>

      {error && <div style={styles.errorBox}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            required
            style={styles.input}
            placeholder="e.g. Akshat Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            required
            style={styles.input}
            placeholder="e.g. akshat@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div style={styles.toggleText}>
        Already have an account?{' '}
        <span style={styles.toggleLink} onClick={onToggleLogin}>
          Log In
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
    backgroundColor: '#0cbb52',
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
    color: '#0cbb52',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
